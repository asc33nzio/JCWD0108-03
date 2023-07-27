const productControllers = require('../controllers/productControllers');
const router = require('express').Router();

router.get('/products/:product', productControllers.getProduct);
router.get('/products/category/:id', productControllers.productByCategory)
router.get('/categories', productControllers.getCategories);
router.get('/productImage/:filename', productControllers.getProductImage);

module.exports = router;
