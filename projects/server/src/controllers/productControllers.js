const db = require('../models');
const products = db.Products;
const categories = db.Categories;

module.exports = {
    getProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await products.findOne({
                where: {
                    id: id
                }
            });

            if (!id) {
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
    getProductByCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 8;
            const totalProduct = await products.count({
                where: { CategoryId: id }
            });
            const result = await products.findAll(
                {where: { CategoryId: id } && {isActive : 1}, limit,offset : limit * (page - 1) }
                );
            res.status(200).send({
                page : page,
                totalPage : Math.ceil(totalProduct / limit),  
                 result
            });
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: error
            });
        }
    },
    addProduct: async (req, res) => {
        try {
            const { productName, price, description, CategoryId, stock } = req.body;
            const imgURL = req.file.filename;

            if (!productName) throw { message: "Product name cannot be empty." };
            if (!price) throw { message: "Price cannot be empty." };
            if (!description) throw { message: "Descriptiion cannot be empty." };
            if (!CategoryId) throw { message: "Category ID cannot be empty." };
            if (!stock) throw { message: "Stock cannot be empty. Please input a minimum of 1 unit." };

            const newProduct = await products.create({
                productName,
                price,
                imgURL,
                description,
                CategoryId,
                stock
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
    getAllProducts: async (req, res) => {
        try {
            const page = req.query.page || 1
            const limit = req.query.limit || 8
            const sort = req.query.sort || "ASC"
            const sortBy = req.query.sortBy
            const result = await products.findAll(
                {
                    order : [[sortBy, sort]],
                    limit,
                    offset : limit * (page - 1)
                }
                )
            res.status(200).send(result)
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    },
    addCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const imgURL = req.file.filename;
            const result = await categories.create(
                {
                    category: name,
                    imgURL: imgURL
                }
            );
            res.status(201).send({
                status: 201,
                message: 'Product created successfully.',
                newCategory: result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    },
    activeProduct: async (req, res) => {
        try {
            const data = await products.findOne(
                {where : {id : req.body.productId}}
            )
            if (data.isActive) {
                await products.update(
                    {isActive : 0},
                    {where : {id : data.id}}
                )
                res.status(200).send({message : "deactive success"})
            }
            else {
                await products.update(
                    {isActive : 1},
                    {where : {id : data.id}}
                    )
                    res.status(200).send({message : "actived success"})
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    }
}


