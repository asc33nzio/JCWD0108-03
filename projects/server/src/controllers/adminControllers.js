const db = require("../models");
const users = db.Users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    getAllCashier: async (req, res) => {
        try {
            const result = await users.findAll({ where: { isAdmin: false } });
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        };
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
            const result = await users.create({ username, email, password: hashPassword, avatar });

            res.status(200).send({
                status: 200,
                message: "Register success.",
                result
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    },
    suspendCashier: async (req, res) => {
        try {
            const userId = req.params.id;
            const findUser = await users.findOne({ where: { id: userId } });
            if (!findUser) {
                return res.status(400).send({
                    status: 404,
                    message: "User not found."
                });
            };
            if (findUser.isSuspended === true) {
                return res.status(400).send({
                    status: 400,
                    message: "User already banned from SCP."
                });
            };
            findUser.isSuspended = true;
            await findUser.save();
            return res.status(200).send({
                status: 200,
                message: "User has been banned successfully."
            });
        } catch (error) {
            return res.status(500).send({
                status: 500,
                message: "Internal server error.",
            });
        }
    },
    deleteCashier: async (req, res) => {
        try {
            const cashierId = req.params.id;
            const token = req.headers.authorization.split(' ')[1];
            const decodeUser = jwt.verify(token, process.env.KEY_JWT);
            const userId = decodeUser.id;
            const article = await users.findOne({ where: { id: cashierId } });
            if (!users) {
                return res.status(400).send({
                    status: 404,
                    message: "Cashier not found."
                });
            };
            const validUser = await users.findByPk(userId);
            if (!validUser) {
                return res.status(400).send({
                    status: 404,
                    message: "User not found."
                });
            };
            if (validUser.isAdmin === true || article.authorId === userId) {
                await users.destroy({
                    where: { id: cashierId }
                });
            } else {
                return res.status(400).send({
                    status: 403,
                    WARNING: "EPERM(1): ACCESS DENIED",
                    message: "Forbidden. You are not the author of this article and you are not an administrator."
                });
            };
            res.status(200).send({ message: "Deleted" })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                status: 500,
                message: "Internal server error."
            });
        }
    },
}