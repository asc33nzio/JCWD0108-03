const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aryobimoalvian@gmail.com',
        pass: 'wzwayinwfttimrvr'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter;