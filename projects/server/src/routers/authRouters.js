const authControllers = require("../controllers/authControllers");
const { verifyToken } = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");
const router = require('express').Router();

router.post("/", multerUpload(`./Public/Avatar`, 'Avatar').single('avatar'), authControllers.addCashier);
router.post("/login", authControllers.login);
router.patch("/forget", authControllers.forgetPassword);
router.get("/keeplogin", verifyToken, authControllers.keepLogin);

module.exports = router;