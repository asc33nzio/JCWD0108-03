const { productControllers } = require('./productControllers');
const { authControllers } = require('./authControllers');
const { txControllers } = require('./txControllers');
const { userControllers } = require('./userControllers');
const { cartControllers } = require('./cartControllers')

module.exports = {
    productControllers,
    authControllers,
    cartControllers,
    txControllers,
    userControllers
};

