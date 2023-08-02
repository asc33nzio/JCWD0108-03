const adminControllers = require("../controllers/adminControllers");
const router = require('express').Router();
const { verifyToken, checkRole } = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");
const { checkRegsiter } = require("../middleware/validator");

router.post("/", verifyToken, checkRole, checkRegsiter, multerUpload(`./public/avatars`, 'Avatar').single('avatar'), adminControllers.addCashier);
router.get("/all", adminControllers.getAllCashier);
router.get("/detailCashier/:id", adminControllers.getCashierById);
router.patch("/updateCashier/:id", verifyToken, checkRole, multerUpload(`./public/avatars`, 'Avatar').single('avatar'), adminControllers.updateCashierData);
router.patch('/suspendCashier/:id', verifyToken, checkRole, adminControllers.suspendCashier);
router.delete('/deletecashier/:id', verifyToken, checkRole, adminControllers.deleteCashier);

module.exports = router;