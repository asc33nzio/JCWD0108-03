const db = require('../models');
const products = db.Products;
const categories = db.Categories;

module.exports = {
    getProduct: async (req, res) => {
        try {
            const { product } = req.params;
            const result = await products.findAll({
                where: {
                    productName: product
                }
            })

            if (!product) {
                return res.status(400).send({
                    status: 400,
                    message: "Product name cannot be empty."
                });
            };

            if (!result) {
                return res.status(404).send({
                    status: 404,
                    message: "Product is not found."
                });
            };

            res.status(200).send({
                status: 200,
                result: result
            });
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    },
    getCategories: async (req, res) => {
        try {
            const result = await categories.findAll();
            res.status(200).send({
                status: 200,
                result: result
            });
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    },
    getProductImage: async (req, res) => {
        try {
            const { filename } = req.params;
            const dirname = process.env.PRODUCT_ASSETS_DIR;
            const filePath = `${dirname}/public/products/${filename}`;

            if (!filename || filename.trim() === "") {
                return res.status(400).send({
                    status: 400,
                    message: "Add a valid product image name."
                });
            };

            const productImage = await products.findOne({ where: { imgURL: filename } });
            if (!productImage) {
                return res.status(400).send({
                    status: 404,
                    message: "Product image not found in the database."
                });
            };

            res.sendFile(filePath);
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: error
            });
        }
    }
};