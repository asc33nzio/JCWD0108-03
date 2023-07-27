const authControllers = require("../controllers/authControllers");
const { multerUpload } = require("../middleware/multer");
const router = require('express').Router();

router.post("/register", multerUpload(`./Public/Avatar`, 'Avatar').single('avatar'), authControllers.addCashier);

module.exports = router;