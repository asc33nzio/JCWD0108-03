const db = require('../models');
const products = db.Products;
const categories = db.Categories;

module.exports = {
    getProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await products.findAll({
                where: {
                    id : id
                }
            });

            if (!products) {
                return res.status(400).send({
                    status: 400,
                    message: "Please input a valid product ID."
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
    getAllProducts: async (req, res) => {
        try {
            const result = await products.findAll();

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
    },
    GetProductByCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await products.findAll(
                { where: { CategoryId: id } }
            );
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: error
            });
        }
    },
    addProduct: async (req, res) => {
        try {
            const { productName, price, description, categoryId } = req.body;
            const imgURL = req.file.filename;

            if (!productName) throw { message: "Product name cannot be empty." };
            if (!price) throw { message: "Price cannot be empty." };
            if (!description) throw { message: "Descriptiion cannot be empty." };
            if (!categoryId) throw { message: "Category ID cannot be empty." };

            const newProduct = await products.create({
                productName,
                price,
                imgURL,
                description,
                categoryId
            });

            return res.status(201).send({
                status: 201,
                message: 'Product created successfully.',
                product: newProduct,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: 'Internal server error.',
            });
        }
    },
    getAllProduct: async (req, res) => {
        try {
            const result = await products.findAll();

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
}


