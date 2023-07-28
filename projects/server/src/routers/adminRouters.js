const adminControllers = require("../controllers/adminControllers");
const { verifyToken } = require("../middleware/auth");
const router = require('express').Router();
const { multerUpload } = require("../middleware/multer");

router.post("/", verifyToken, multerUpload(`./Public/Avatar`, 'Avatar').single('avatar'), adminControllers.addCashier);
router.get("/all", adminControllers.getAllCashier);


module.exports = router;