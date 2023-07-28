const db = require("../models");
const user = db.Users;

module.exports = {
    getAllCashier: async (req, res) => {
        try {
            // console.log(req.user);
            // if (!isAdmin) {
            // }
            const result = await user.findAll({
                where: { isAdmin: false }
            });
            res.status(200).send(result);
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getCashierImage: async (req, res) => {
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
}