const db = require('../models');
const user = db.User;

module.exports = {
    addcashier: async (req, res) => {
        try {
            // const { username, email, password } = req.body;
            // const {file} = req.body
            const isUserExist = await user.findOne({
                where: { username }
            });
            const isEmailExist = await user.findOne({
                where: { email }
            });
        } catch (error) {
            res.status(400).send(error)
        }
    }
}