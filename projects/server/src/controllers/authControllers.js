const db = require('../models');
const users = db.Users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const checkLogin = await user.findOne({
                where: { username: username }
            });
            if (!checkLogin) throw { message: "User not Found" }
            if (checkLogin.isVerified == false) throw ({ message: 'Account is not verified' });
            const isValid = await bcrypt.compare(password, checkLogin.password);
            if (!isValid) throw { message: "wrong password" }
            const payload = { id: checkLogin.id, isAdmin: checkLogin.isAdmin }
            const token = jwt.sign(payload, "minproBimo", { expiresIn: "3d" });
            res.status(200).send({
                message: "Login success",
                token
            });
        } catch (error) {
            res.status(400).send(error);
            console.log(error);
        }
    },
    keepLogin: async (req, res) => {

    },

    addCashier: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const avatar = req.file.filename;
            const isUserExist = await users.findOne({ where: { username } });
            const isEmailExist = await users.findOne({ where: { email } });
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
    },
    forgetPassword: async (req, res) => {
        try {
            const isAccountExist = await user.findOne({ where: { email: req.body.email } });
            if (!isAccountExist) throw { message: "Email not found" }
            const { email } = req.body;
            const payload = { id: isAccountExist.id }
            const token = jwt.sign(payload, "minproBimo", { expiresIn: "3d" });
            const data = await fs.readFileSync("./index.html", "utf-8");
            const tempCompile = await handlebars.compile(data);
            const tempResult = tempCompile(data);
            await user.update(
                { isVerified: 1 },
                { where: { email: req.body.email } }
            );
            await transporter.sendMail({
                from: "aryobimoalvian@gmail.com",
                to: email,
                subject: "New Phone",
                html: tempResult,
            });
            res.status(200).send(token);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}