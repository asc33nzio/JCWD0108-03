const db = require('../models');
const cartItems = db.CartItems;
const products = db.Products;

module.exports = {
    addCartItem: async (req, res) => {
        try {
            const { ProductId, quantity } = req.body;
            const UserId = req.user.id;

            if (!ProductId || !quantity) {
                return res.status(400).send({
                    status: 400,
                    message: 'Both productId and quantity are required.',
                });
            };

            const checkProduct = await products.findOne({
                where: {
                    id: ProductId,
                    isActive: true
                }
            });

            if (!checkProduct) {
                return res.status(400).send({
                    status: 404,
                    message: "Product is out of stock or doesn't exist.",
                });
            };

            const newCartItem = await cartItems.create({
                ProductId,
                quantity,
                UserId
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