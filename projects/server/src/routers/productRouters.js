const productControllers = require('../controllers/productControllers');
const { verifyToken, checkRole } = require('../middleware/auth');
const { multerUpload } = require("../middleware/multer");
const router = require('express').Router();

router.post('/addProduct', verifyToken, checkRole, multerUpload(`./public/products`, 'ProductImage').single('productImage'), productControllers.addProduct);
router.post('/addCategory', verifyToken, checkRole, multerUpload(`./public/categories`, 'CategoryImage').single('categoryImage'), productControllers.addCategory)
router.get('/all', productControllers.getAllProducts);
router.get('/categories', productControllers.getCategories);
router.get('/category/:id', productControllers.GetProductByCategory)
router.get('/:id', productControllers.getProduct);
router.get('/image/:filename', productControllers.getProductImage);

module.exports = router;
