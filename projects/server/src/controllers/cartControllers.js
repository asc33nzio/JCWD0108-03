const db = require('../models');
const cartItems = db.CartItems;

module.exports = {
    addCartItem: async (req, res) => {
        try {
            const { productId, quantity } = req.body;

            if (!productId || !quantity) {
                return res.status(400).send({
                    status: 400,
                    message: 'Both productId and quantity are required.',
                });
            };

            const newCartItem = await cartItems.create({
                productId,
                quantity
            });

            return res.status(201).send({
                status: 201,
                message: 'Item added to the cart successfully.',
                cartItems: newCartItem
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: 'Internal server error.',
            });
        };
    }
};