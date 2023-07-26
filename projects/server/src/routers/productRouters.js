const productControllers = require('../controllers/productControllers')


const router = require('express').Router()

router.get('/coffee', productControllers.coffee)
router.get('/category', productControllers.getCategory)

module.exports = router