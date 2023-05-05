const { response } = require('express');
const conn = require('../dbconnection').promise();
const bcrypt = require('bcryptjs');
var nodemailer = require("nodemailer")
var smtpTransport = require('nodemailer-smtp-transport');


exports.GetEmail = async(req, res, next) => {
    try {
        const [rows] = await conn.execute('Select * from users where Email=?', [req.body.Email])
        if (rows.length > 0) {
            var array = []
            var temp
            for (var i = 1; i <= 4; i++) {
                temp = Math.floor(Math.random() * 10)
                array.push(temp)
            }
            if (array.length > 3) {
                const [update] = await conn.execute('Update users set `otp`=? where Email = ?', [parseInt(array.toString().replace(/,/g, '')), req.body.Email])
                const transporter = nodemailer.createTransport(smtpTransport({
                    host: "webmail.coderouting.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    tls: {
                        rejectUnauthorized: false,
                    },
                    auth: {
                        user: 'donotreply@coderouting.com',
                        pass: 'kgkh4241licv'
                    }
                }));
                var date = new Date();
                var mailOptions = {
                    from: 'donotreply@coderouting.com',
                    to: req.body.Email,
                    subject: 'Forgot password email',
                    html: `  <div class="container-fluid">
                <div style="padding-inline: 200px;">
                    <div class="row align-items-center justify-content-center flex-column">
                        <div class="w-100">
                            <p>Hi ${rows[0].Emp_Name},</p>
                            <div class="py-4 d-flex align-items-center">
                               <p>OTP is : ${parseInt(array.toString().replace(/,/g,''))}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            `
                };
                let sentMail = transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);

                    }
                });
                return res.send({
                    status: 200,
                    message: "Otp Send"
                })
            }
        } else {
            return res.send({
                status: 400,
                message: "Email not Found"
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.EmailOtp = async(req, res, next) => {
    try {
        const [rows] = await conn.execute('Select * from users where otp=?', [req.body.otp])
        if (rows.length > 0) {
            return res.send({
                status: 200,
                message: "Correct Otp"
            })
        } else {
            return res.send({
                status: 400,
                message: "Incorrect Otp"
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.changePasswordForget = async(req, res, next) => {
    try {
        const [rows] = await conn.execute('Select * from users where Email=?', [req.body.Email])
        if (rows.length > 0) {
            if (rows[0].Create_Password !== "" && rows[0].Create_Password !== null && rows[0].Create_Password !== undefined) {
                const hashPass = await bcrypt.hash(req.body.Create_Password, 12);
                const [update] = await conn.execute('update users set `Create_Password`=? where Email = ?', [hashPass, req.body.Email])
                if (update.affectedRows == 1) {
                    return res.send({
                        status: 200,
                        message: "Password Updated"
                    })
                }
            } else {
                return res.send({
                    status: 400,
                    message: "Failed"
                })
            }
        } else {
            return res.send({
                status: 400,
                message: "Email not Found"
            })
        }
    } catch (err) {
        next(err)
    }
}