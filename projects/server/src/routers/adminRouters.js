const adminControllers = require("../controllers/adminControllers");
const { verifyToken, checkRole } = require("../middleware/auth");
const router = require('express').Router();
const { multerUpload } = require("../middleware/multer");

router.post("/", verifyToken, checkRole, multerUpload(`./public/avatars`, 'Avatar').single('avatar'), adminControllers.addCashier);
router.get("/all", adminControllers.getAllCashier);


module.exports = router;