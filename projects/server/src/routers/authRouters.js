const authControllers = require("../controllers/authControllers");
const { verifyToken } = require("../middleware/auth");
const router = require('express').Router();

router.post("/login", authControllers.login);
router.patch("/forget", authControllers.forgetPassword);
router.get("/keeplogin", verifyToken, authControllers.keepLogin);

module.exports = router;