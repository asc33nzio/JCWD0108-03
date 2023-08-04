const txControllers = require("../controllers/txControllers");
const { verifyToken, checkRole } = require("../middleware/auth");
const router = require('express').Router();

router.post('/', verifyToken, txControllers.createTransaction);
router.post('/checkout/:transactionId', verifyToken, txControllers.checkout);
router.get('/sales', txControllers.getAllSales);
router.get('/sales/:txId', txControllers.getSaleById);
router.get('/sales/date/:saleDate', txControllers.getSalesByDate);
router.get('/range/', txControllers.getSalesBetweenDates);
router.get('/:txId', txControllers.getPayment);

module.exports = router;