const db = require('../models');
const products = db.Products;
const cartItems = db.CartItems;
const transactions = db.Transactions;
const sales = db.Sales;
const payments = db.Payments;

module.exports = {
    createTransaction: async (req, res) => {
        try {
            const allCartItems = await cartItems.findAll({
                where: {
                    UserId: req.user.id,
                },
                include: [products]
            });

            if (allCartItems.length === 0) {
                return res.status(400).send({
                    status: 400,
                    message: 'Your shopping cart is empty.'
                });
            };

            let totalPrice = 0;
            for (const cartItem of allCartItems) {
                totalPrice += cartItem.quantity * cartItem.Product.price;
            };

            const newTransaction = await transactions.create({
                totalAmount: totalPrice,
                transactionDate: new Date(),
                allCartItems: allCartItems
            }, {
                include: ['CartItems'],
            });

            for (const cartItem of allCartItems) {
                await cartItem.update({ TransactionId: newTransaction.id });
            };

            const salesRecords = allCartItems.map((cartItem) => ({
                productName: cartItem.Product.productName,
                quantitySold: cartItem.quantity,
                totalAmount: cartItem.quantity * cartItem.Product.price,
                transactionDate: new Date(),
                transactionId: newTransaction.id,
                productId: cartItem.ProductId
            }));

            await sales.bulkCreate(salesRecords);

            return res.status(201).send({
                status: 201,
                message: 'Transaction created successfully.',
                transaction: newTransaction,
                breakdown: salesRecords
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: 'Internal server error.'
            });
        };
    },
    checkout: async (req, res) => {
        try {
            const { amountPaid } = req.body;
            const userId = req.user.id;
            const transactionId = req.params.transactionId;
            const transaction = await transactions.findByPk(transactionId);

            const findCompletedSale = await sales.findAll({
                where: {
                    transactionId: transactionId,
                    completed: true
                }
            });

            if (findCompletedSale.length > 0) {
                return res.status(400).send({
                    status: 400,
                    message: 'Customer has already paid for this order.',
                });
            };

            if (!transaction) {
                return res.status(404).send({
                    status: 404,
                    message: 'Transaction not found.',
                });
            };

            if (!amountPaid) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please specify the cash amount.',
                });
            };

            const changeAmount = amountPaid - transaction.totalAmount;

            if (changeAmount <= 0) {
                return res.status(400).send({
                    status: 400,
                    message: 'Insufficient payment. Checkout failed.',
                });
            } else {
                const newPayment = await payments.create({
                    amountPaid: amountPaid,
                    changeAmount: changeAmount,
                    TransactionId: transaction.id
                });

                await cartItems.destroy({
                    where: {
                        UserId: userId
                    },
                });

                await sales.update(
                    {
                        completed: true,
                    },
                    {
                        where: {
                            transactionId: transactionId,
                        }
                    }
                );

                const salesRecords = await sales.findAll({
                    where: {
                        transactionId: transactionId
                    }
                });

                console.log('Sales Records:', salesRecords);

                let totalQuantitySold = 0;
                for (const sale of salesRecords) {
                    totalQuantitySold += sale.quantitySold;
                };

                for (const sale of salesRecords) {
                    const product = await products.findByPk(sale.productId);

                    const newStockQuantity = Math.max(product.stock - sale.quantitySold, 0);

                    await products.update(
                        {
                            stock: newStockQuantity
                        },
                        {
                            where: {
                                id: sale.productId
                            }
                        }
                    );
                };

                return res.status(200).send({
                    status: 200,
                    message: 'Checkout successful.',
                    changeAmount: changeAmount,
                    payment: newPayment
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: 'Internal server error.',
            });
        };
    }
};