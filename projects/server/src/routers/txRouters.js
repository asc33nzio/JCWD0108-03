const txControllers = require("../controllers/txControllers");
const { verifyToken, checkRole } = require("../middleware/auth");
const router = require('express').Router();

router.post('/', verifyToken, txControllers.createTransaction);
router.post('/checkout/:transactionId', verifyToken, txControllers.checkout);

module.exports = router;
