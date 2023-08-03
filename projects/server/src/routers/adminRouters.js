const adminControllers = require("../controllers/adminControllers");
const { verifyToken, checkRole } = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");
const router = require('express').Router();

router.post("/", verifyToken, checkRole, multerUpload(`./public/avatars`, 'Avatar').single('avatar'), adminControllers.addCashier);
router.post("/webmaster", multerUpload(`./public/avatars`, 'Avatar').single('avatar'), adminControllers.addAdmin);
router.get("/all", adminControllers.getAllCashier);
router.get("/detailCashier/:id", adminControllers.getCashierById);
router.patch("/updateCashier/:id", verifyToken, checkRole, multerUpload(`./public/avatars`, 'Avatar').single('avatar'), adminControllers.updateCashierData);
router.patch('/suspendCashier/:id', verifyToken, checkRole, adminControllers.suspendCashier);
router.delete('/deletecashier/:id', verifyToken, checkRole, adminControllers.deleteCashier);

module.exports = router;