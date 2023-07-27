const productControllers = require('../controllers/productControllers');
const { multerUpload } = require("../middleware/multer");
const router = require('express').Router();

router.get('/products/:product', productControllers.getProduct);
router.get('/products/category/:id', productControllers.productByCategory)
router.get('/products/image/:filename', productControllers.getProductImage);
router.post('/products', multerUpload(`./public/products`, 'Product').single('productImage'), productControllers.addProduct);
router.get('/categories', productControllers.getCategories);

module.exports = router;
