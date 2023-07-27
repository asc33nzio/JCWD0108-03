const productControllers = require('../controllers/productControllers');
const { multerUpload } = require("../middleware/multer");
const router = require('express').Router();

router.post('/', multerUpload(`./public/products`, 'Product').single('productImage'), productControllers.addProduct);
router.get('/all', productControllers.getAllProduct);
router.get('/categories', productControllers.getCategories);
router.get('/:id', productControllers.getProduct);
router.get('/image/:filename', productControllers.getProductImage);

module.exports = router;
