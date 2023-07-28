const { productControllers } = require('./productControllers');
const { authControllers } = require('./authControllers');
const { txControllers } = require('./txControllers');
const { userControllers } = require('./userControllers');

module.exports = {
    productControllers,
    authControllers,
    txControllers,
    userControllers
};

