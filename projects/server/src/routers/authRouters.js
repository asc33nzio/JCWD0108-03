const authControllers = require("../controllers/authControllers");
const { verifyToken } = require("../middleware/auth");
const router = require('express').Router();

router.post("/login", authControllers.login);
router.get("/keeplogin", verifyToken, authControllers.keepLogin);
router.put("/forget", authControllers.forgetPassword);
router.patch("/resetpassword", verifyToken, authControllers.resetPassword);

module.exports = router;