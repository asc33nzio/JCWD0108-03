const jwt = require('jsonwebtoken');
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

            const existingCartItem = await cartItems.findOne({
                where: {
                    ProductId,
                    UserId
                }
            });

            if (existingCartItem) {
                existingCartItem.quantity += quantity;
                await existingCartItem.save();

                const allUserCartItems = await cartItems.findAll({
                    where: {
                        UserId
                    }
                });

                return res.status(200).send({
                    status: 200,
                    message: 'Cart item quantity updated successfully.',
                    cartItem: existingCartItem,
                    allCartItems: allUserCartItems
                });
            } else {
                const newCartItem = await cartItems.create({
                    ProductId,
                    quantity,
                    UserId
                });

                const allUserCartItems = await cartItems.findAll({
                    where: {
                        UserId
                    }
                });

                return res.status(201).send({
                    status: 201,
                    message: 'Item added to the cart successfully.',
                    cartItem: newCartItem,
                    allCartItems: allUserCartItems
                });
            }
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: 'Internal server error.',
            });
        };
    },
    getCartByUser: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.KEY_JWT);
            const userId = decodedToken.id;

            const result = await cartItems.findAll(
                { where: { UserId: userId } }
            );
            res.status(200).send({
                status: 200,
                result
            });
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: error
            });
        }
    }
};