const { Op } = require('sequelize');
const db = require('../models');
const user = db.Users
const products = db.Products;
const categories = db.Categories;

module.exports = {
    getProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await products.findOne({
                where: {
                    id: id,
                    isDelete:false
                }
            });
            if (result.isDelete) throw{
                message:"product not found"
            }

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
            const page = parseInt(req.query.page) || 1
            const limit = 8
            const totalCategory = await categories.count({
                where : {isDelete : 0}
            })
            const result = await categories.findAll({
                where : {isDelete : 0},
                limit,
                offset :  limit * (page- 1)
            });
            res.status(200).send({
                page : page,
                totalPage : Math.ceil(totalCategory / limit),
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
                where: { CategoryId: id, isDelete:false }
            });
            const result = await products.findAll(
                {where: { CategoryId: id, isDelete : 0 },
                 limit,
                 offset : limit * (page - 1) }
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
    getProductByCategoryCashier: async (req, res) => {
        try {
            const id = req.params.id;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 8;
            const totalProduct = await products.count({
                where: { CategoryId: id, isDelete:false, isActive:true }
            });
            const result = await products.findAll(
                {
                    where: { CategoryId: id, isActive : true, isDelete: false },
                    limit,
                    offset : limit * (page - 1) 
                }
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
            console.log(error);
            return res.status(500).send({
                status: 500,
                message: 'Internal server error.',
            });
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const id = req.user.id
            const search = req.query.search || ""
            const page = req.query.page || 1
            const limit = req.query.limit || 10
            const sort = req.query.sort || "ASC"
            const sortBy = req.query.sortBy || "productName"
            const totalProduct = await products.count({
                where : {isDelete : false}
            })
            const userData = await user.findOne(
                { where: { id: id  } }
            )

            if (userData.isAdmin) {
                const result = await products.findAll(
                    {
                        where: { 
                            productName: { [Op.like]: `%${search}%` },
                            isDelete : false
                        },
                        order: [[sortBy, sort]],
                        limit,
                        offset: limit * (page - 1)
                    }
                )
                return (
                    res.status(200).send({
                        totalPage : Math.ceil(totalProduct / limit),
                        page: page,
                        result
                    })
                )
            }

            else {
                const allProducts = await products.count(
                    {where: { productName: { [Op.like]: `%${search}%` }, isActive: true, isDelete: false }}
                ) 
                const result = await products.findAll(
                    {
                        where: { productName: { [Op.like]: `%${search}%` }, isActive: true, isDelete: false },
                        order: [[sortBy, sort]],
                        limit,
                        offset: limit * (page - 1)
                    }
                    )
                return (
                    res.status(200).send({
                        totalPage: Math.ceil(allProducts / limit),
                        page: page,
                        result
                    })
                )
            }
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    },
    getAllProductCashier: async (req, res) => {
        try {
            const page = req.query.page || 1
            const limit = req.query.limit || 8
            const sort = req.query.sort || "ASC"
            const sortBy = req.query.sortBy
            const result = await products.findAll(
                {
                    where: { isActive: 1, isDelete:0 },
                    order: [[sortBy, sort]],
                    limit,
                    offset: limit * (page - 1)
                }
            )
            res.status(200).send(result)
        } catch (error) {
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
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    },
    activeDeactive: async (req, res) => {
        try {
            const data = await products.findOne(
                { where: { id: req.body.productId } }
            )
            if (data.isActive) {
                await products.update(
                    { isActive: 0 },
                    { where: { id: data.id } }
                )
                res.status(200).send({ message: "deactive success" })
            }
            else {
                await products.update(
                    { isActive: 1 },
                    { where: { id: data.id } }
                )
                res.status(200).send({ message: "actived success" })
            }
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    },
    updateProduct : async (req, res) => {
        try {
            const {id} = req.params
            const {price, productName, stock, description} = req.body
            const imgURL = req.file.filename

            const result = await products.update(
                {price, productName,stock, description, imgURL: imgURL},
                {where : {id : id}}
            )
            res.status(200).send({
                message : "update success"
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    },
    deleteCategory : async (req, res) => {
        try {
            const {categoryId} = req.body
            const category = await categories.findOne({
                where: {id : categoryId}
            })
            if (!category) {
                throw({message: "category not found"})
            }
            if (!category.isDelete) {
                await categories.update(
                    {isDelete : 1},
                    {where :{id : categoryId}}
                    )
            }
        
            await products.update(
                {isDelete : 1},
                {where : {CategoryId : categoryId}}
                )
            res.status(200).send({message:"delete success"})
        } catch (error) {
            console.log(error.message);
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    }
}


