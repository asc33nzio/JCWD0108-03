const { Op, fn, col, sequelize } = require('sequelize');
const db = require('../models');
const products = db.Products;
const cartItems = db.CartItems;
const transactions = db.Transactions;
const categories = db.Categories
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

            if (changeAmount < 0) {
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
    },
    getPayment: async (req, res) => {
        try {
            const { txId } = req.params;

            const result = await payments.findOne({
                where: {
                    TransactionId: txId
                }
            });

            return res.status(200).send({
                status: 200,
                message: 'Payment Record Succesfully Fetched.',
                paymentRecord: result
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: 'Internal server error.',
            });
        };
    },
    getAllSales: async (req, res) => {
        try {
            const results = await sales.findAll({
                where: {
                    completed: true
                },
                attributes: [
                    'transactionId',
                    [fn('sum', col('quantitySold')), 'totalQuantitySold'],
                    [fn('sum', col('sales.totalAmount')), 'totalAmountSold']
                ],
                include: [
                    {
                        model: transactions,
                        attributes: ['txTime']
                    },
                    {
                        model: products,
                        as: 'Product',
                        attributes: ['id', 'imgURL', 'price', 'categoryId'],
                        include: [
                            {
                                model: categories,
                                attributes: ['category']
                            }
                        ]
                    },
                ],
                group: ['transactionId', 'Product.id']
            });
    
            // Restructure the data to group products by transactionId
            const salesRecords = results.reduce((acc, result) => {
                const transactionId = result.transactionId;
                const transactionData = {
                    transactionId: result.transactionId,
                    totalQuantitySold: result.totalQuantitySold,
                    totalAmountSold: result.totalAmountSold,
                    Transaction: {
                        txTime: result.Transaction.txTime
                    },
                    products: []
                };
    
                // Check if the transaction already exists in the accumulator
                const existingTransaction = acc.find(item => item.transactionId === transactionId);
    
                // If the transaction doesn't exist, add it to the accumulator
                if (!existingTransaction) {
                    transactionData.products.push({
                        id: result.Product.id,
                        imgURL: result.Product.imgURL,
                        price: result.Product.price,
                        categoryId: result.Product.categoryId,
                        Category: {
                            category: result.Product.Category.category
                        }
                    });
                    acc.push(transactionData);
                } else {
                    // If the transaction already exists, add the product to its products array
                    existingTransaction.products.push({
                        id: result.Product.id,
                        imgURL: result.Product.imgURL,
                        price: result.Product.price,
                        categoryId: result.Product.categoryId,
                        Category: {
                            category: result.Product.Category.category
                        }
                    });
                }
    
                return acc;
            }, []);
    
            return res.status(200).send({
                status: 200,
                message: 'Sales Records Successfully Fetched.',
                salesRecords: salesRecords
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: 'Internal server error.',
            });
        }
    }
};