const db = require('../models');
const user = db.Users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    addCashier: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const avatar = req.file.filename;
            const isUserExist = await user.findOne({ where: { username } });
            const isEmailExist = await user.findOne({ where: { email } });
            if (isUserExist) throw { message: "Username has been used." };
            if (isEmailExist) throw { message: "E-mail has been used." };

            const salt = await bcrypt.genSalt(5);
            const hashPassword = await bcrypt.hash(password, salt);
            const result = await user.create({ username, email, password: hashPassword, avatar });
            const payload = { id: result.id };
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "1h" });

            res.status(200).send({
                status: 200,
                message: "Register success.",
                JWT: token,
                result
            });
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    }
};