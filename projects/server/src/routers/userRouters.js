const  userControllers  = require("../controllers/userControllers");
const router = require('express').Router();

router.get("/", userControllers.getAllCashier);

module.exports = router;