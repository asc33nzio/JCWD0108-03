const authControllers = require("../controllers/authControllers");
const { multerUpload } = require("../middleware/multer");
const router = require('express').Router();

router.post("/register", multerUpload(`./public/avatars`, 'Avatar').single('avatar'), authControllers.addCashier);

module.exports = router;