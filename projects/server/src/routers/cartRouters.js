const cartControllers = require('../controllers/cartControllers');
const { verifyToken } = require("../middleware/auth");
const router = require('express').Router();

router.post('/', verifyToken, cartControllers.addCartItem);

module.exports = router;
