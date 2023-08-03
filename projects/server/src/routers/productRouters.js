const productControllers = require('../controllers/productControllers');
const { verifyToken, checkRole } = require('../middleware/auth');
const { multerUpload } = require("../middleware/multer");
const router = require('express').Router();

router.patch('/deleteCategory', productControllers.deleteCategory)
router.post('/addProduct', verifyToken, checkRole, multerUpload(`./public/products`, 'ProductImage').single('productImage'), productControllers.addProduct);
router.post('/addCategory', verifyToken, checkRole, multerUpload(`./public/categories`, 'CategoryImage').single('categoryImage'), productControllers.addCategory)
router.get('/all', verifyToken, productControllers.getAllProducts);
router.get('/categories', productControllers.getCategories);
router.get('/category/:id',productControllers.getProductByCategory);
router.get('/categoryCashier/:id',productControllers.getProductByCategoryCashier);
router.get('/category/:id',productControllers.getProductByCategory);
router.get('/:id', productControllers.getProduct);
router.get('/image/:filename', productControllers.getProductImage);
router.patch('/:id',multerUpload(`./public/products`, 'ProductImage').single('imgURL'), productControllers.updateProduct)
router.patch('/' ,productControllers.activeDeactive);

module.exports = router;