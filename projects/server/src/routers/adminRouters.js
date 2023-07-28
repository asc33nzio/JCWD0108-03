const adminControllers = require("../controllers/adminControllers");
const router = require('express').Router();
const { multerUpload } = require("../middleware/multer");

router.post("/", multerUpload(`./public/avatars`, 'Avatar').single('avatar'), adminControllers.addCashier);
router.get("/all", adminControllers.getAllCashier);


module.exports = router;