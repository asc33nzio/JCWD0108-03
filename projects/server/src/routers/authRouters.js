const router = require('express').Router();
const authControllers = require("../controllers/authControllers");
const { verifyToken } = require("../middleware/auth");
const { checkPassword } = require("../middleware/validator");

router.post("/cashierlogin", authControllers.cashierLogin);
router.post("/adminlogin", authControllers.adminLogin);
router.get("/keeplogin", verifyToken, authControllers.keepLogin);
router.put("/forget", authControllers.forgetPassword);
router.patch("/resetpassword",checkPassword, verifyToken, authControllers.resetPassword);

module.exports = router;