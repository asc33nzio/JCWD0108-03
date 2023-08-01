const db = require('../models');
const users = db.Users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require("fs")
const handlebars = require("handlebars")
const transporter = require("../middleware/transporter.js")

module.exports = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const checkLogin = await users.findOne({
                where: { username: username }
            });

            if (!checkLogin) throw { message: "User not Found." }

            if (checkLogin.isVerified == false) throw ({ message: 'Account is not verified.' });

            const isValid = await bcrypt.compare(password, checkLogin.password);

            if (!isValid) throw { message: "Wrong password." };

            const payload = { id: checkLogin.id, isAdmin: checkLogin.isAdmin };
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "1h" });

            res.status(200).send({
                message: "Login success",
                user: checkLogin,
                token
            });
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: 'Internal server error.',
            });
        }
    },
    keepLogin: async (req, res) => {
        try {
            const result = await users.findOne({
                where: {
                    id: req.user.id
                }
            });
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    },
    forgetPassword: async (req, res) => {
        try {
            const isAccountExist = await users.findOne({ where: { email: req.body.email } });
            if (!isAccountExist) throw { message: "E-mail not found." }
            const { email } = req.body;
            const payload = { id: isAccountExist.id }
            const token = jwt.sign(payload, process.env.KEY_JWT, { expiresIn: "4h" });
            const data = await fs.readFileSync("./reset_password_template.html", "utf-8");
            const tempCompile = await handlebars.compile(data);
            const tempResult = tempCompile(data);
            await users.update(
                { isVerified: true },
                { where: { email: req.body.email } }
            );
            await transporter.sendMail({
                from: "aryobimoalvian@gmail.com",
                to: email,
                subject: "Reset Your Cashierkeun Account Password.",
                html: tempResult
            });
            res.status(200).send(token);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        };
    },
    resetPassword: async (req, res) => {
        try {
            const { newPassword, confirmPassword } = req.body;
            if (newPassword !== confirmPassword) throw { message: "Password is not same" }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(confirmPassword, salt);
            const result = await users.update(
                { password: hashPassword },
                { where: { id: req.user.id } }
            );
            res.status(200).send({ message: "Password has been changed" });
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
}