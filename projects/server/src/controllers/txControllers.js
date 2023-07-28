const { DATE } = require('sequelize');
const db = require('../models');
const product = db.Products;
const cartItems = db.CartItems;
const transactions = db.Transactions;

module.exports = {
    createTransaction: async (req, res) => {
        try {
            const cartItems = await cartItems.findAll({
                where: {
                    id: req.user.id
                },
            });

            let totalPrice = 0;
            for (const cartItem of cartItems) {
                totalPrice += cartItem.quantity * cartItem.product.price;
            };

            const newTransaction = await transactions.create({
                totalAmount: totalPrice,
                transactionDate: DATE.now, 
                CartItems: cartItems
            }, {
                include: [cartItems], 
            });

            // await cartItems.destroy({
            //     where: {
                    
            //     }
            // });

            return res.status(201).send({
                status: 201,
                message: 'Transaction created successfully.',
                transaction: newTransaction,
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: 'Internal server error.',
            });
        };
    }
};