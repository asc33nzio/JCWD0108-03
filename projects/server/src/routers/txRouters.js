const txControllers = require("../controllers/txControllers");
const { verifyToken, checkRole } = require("../middleware/auth");
const router = require('express').Router();

router.post('/', verifyToken, txControllers.createTransaction);

module.exports = router;
