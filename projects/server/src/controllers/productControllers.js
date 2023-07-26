const db = require('../models')
const products = db.Products
const categories = db.Categories

module.exports = {
    coffee : async (req, res) => {
        try {
            const result = await products.findAll({
                where : {categoryId : 1}
            })
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    getCategory : async (req, res) => {
        try {
            const result = await categories.findAll()
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}