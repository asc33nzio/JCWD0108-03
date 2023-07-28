const db = require('../models');
const products = db.Products;
const cartItems = db.CartItems;
const transactions = db.Transactions;

module.exports = {
    createTransaction: async (req, res) => {
        try {
            const allCartItems = await cartItems.findAll({
                where: {
                    UserId: req.user.id,
                },
                include: [products]
            });

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

            return res.status(201).send({
                status: 201,
                message: 'Transaction created successfully.',
                transaction: newTransaction
            });
        } catch (error) {
            console.error(error)
            return res.status(500).send({
                status: 500,
                message: 'Internal server error.'
            });
        };
    },
    checkout: async (req, res) => {
        try {
            const { amountPaid } = req.body;
            const transactionId = req.params.transactionId;

            const transaction = await transactions.findByPk(transactionId);

            if (!transaction) {
                return res.status(404).send({
                    status: 404,
                    message: 'Transaction not found.',
                });
            };

            const changeAmount = amountPaid - transaction.totalAmount;

            if (changeAmount < 0) {
                return res.status(400).send({
                    status: 400,
                    message: 'Insufficient payment. Checkout failed.',
                });
            } else {
                await cartItems.destroy({
                    where: {
                        TransactionId: transaction.id
                    },
                });

                return res.status(200).send({
                    status: 200,
                    message: 'Checkout successful.',
                    changeAmount: changeAmount,
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: 'Internal server error.',
            });
        }
    }
};