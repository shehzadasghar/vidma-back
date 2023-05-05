const conn = require('../dbconnection').promise();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer")
var smtpTransport = require('nodemailer-smtp-transport');

exports.EmployerSignup = async(req, res, next) => {
    try {
        const hashPass = await bcrypt.hash(req.body.password, 12);
        const [row] = await conn.execute('Select * from users where Email=?', [req.body.email])

        if (row.length > 0) {
            return res.send({
                message: "Email already exist"
            })
        } else {
            const [rows] = await conn.execute('Insert into `users` (`Emp_Name`,`Designation`,`Phone_Number`,`Email`,`Create_Password`,`type`,`City`,`State`) values (?,?,?,?,?,?,?,?)', [
                req.body.emp_name,
                req.body.designation,
                req.body.phonenumber,
                req.body.email,
                hashPass,
                1,
                req.body.city,
                req.body.state

            ])
            if (rows.affectedRows == 1) {
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
                var dated = date
                var mailOptions = {
                    from: 'donotreply@coderouting.com',
                    to: req.body.email,
                    subject: 'welcome email',
                    html: `  <div class="container-fluid">
                                        <div style="padding-inline: 200px;">
                                            <div class="row align-items-center justify-content-center flex-column">
                                                <div class="w-100">
                                                    <p>Hi ${req.body.emp_name} ${req.body.designation},your email is ${req.body.email} and password is ${req.body.password}</p>
                                                    
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
                    message: "Successfull"
                })
            } else {
                return res.send({
                    message: "Fail"
                })
            }
        }

    } catch (err) {
        next(err)
    }
}

exports.AdminLogin = async(req, res, next) => {
    try {
        const [getEmai] = await conn.execute('select * from users where Email=? and type=0', [req.body.email])
        if (getEmai.length > 0) {
            const passwordMatch = await bcrypt.compare(req.body.password, getEmai[0].Create_Password);
            if (passwordMatch == false) {
                return res.status(400).send({
                    message: "invalid password"
                })
            } else {
                var Token = jwt.sign({ id: getEmai[0].id }, 'the-super-strong-secrect', { expiresIn: '3h' });
                return res.status(200).send({
                    message: "successfully login",
                    token: Token,
                    data: getEmai[0]
                })
            }
        } else {
            return res.status(400).send({
                message: "invalid email"
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.EmployeeSignup = async(req, res, next) => {
    try {
        const hashPass = await bcrypt.hash(req.body.password, 12);
        const [row] = await conn.execute("Select * from users where Id=? and type=1", [req.body.employer_id]);
        if (row.length > 0) {
            console.log("hhh")
            const [rows] = await conn.execute('Insert into `users` (`Emp_Name`,`Designation`,`Phone_Number`,`Email`,`Create_Password`,`type`,`City`,`State`,`employer_id`) values (?,?,?,?,?,?,?,?,?)', [
                req.body.emp_name,
                req.body.designation,
                req.body.phonenumber,
                req.body.email,
                hashPass,
                2,
                req.body.city,
                req.body.state,
                req.body.employer_id

            ])
            if (rows.affectedRows == 1) {
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
                var dated = date
                var mailOptions = {
                    from: 'donotreply@coderouting.com',
                    to: req.body.email,
                    subject: 'welcome email',
                    html: `  <div class="container-fluid">
                                    <div style="padding-inline: 200px;">
                                        <div class="row align-items-center justify-content-center flex-column">
                                            <div class="w-100">
                                            <p>Hi ${req.body.emp_name} ${req.body.designation},your email is ${req.body.email} and password is ${req.body.password}</p>
                                                
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
                    message: "Successfull"
                })
            } else {
                return res.send({
                    message: "Fail"
                })
            }
        } else {
            return res.send({
                message: "Employer_id is not valid"
            })
        }
    } catch (err) {
        next(err)


    }
}

exports.Login = async(req, res, next) => {
    try {
        const [getEmail] = await conn.execute('Select * from users where Email=?', [req.body.email]);
        if (getEmail.length > 0) {
            const passwordMatch = await bcrypt.compare(req.body.password, getEmail[0].Create_Password);
            if (passwordMatch == true) {
                var Token = jwt.sign({ id: getEmail[0].id }, 'the-super-strong-secrect', { expiresIn: '3h' });
                return res.status(200).send({
                    message: "successfully login",
                    token: Token,
                    data: getEmail[0]
                })

            } else {
                return res.send({
                    message: "invalid Password"
                })
            }
        } else {
            return res.send({
                message: "invalid email"
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.getAllEmployers = async(req, res, next) => {
    try {
        const [rows] = await conn.execute('select * from users where type=1 order by id DESC')
        return res.status(200).send({
            message: "fetched",
            data: rows
        })
    } catch (err) {
        next(err)
    }
}

exports.getAllEmployees = async(req, res, next) => {
    try {
        const [rows] = await conn.execute('select * from users where type=2 order by id DESC')
        return res.status(200).send({
            message: "fetched",
            data: rows
        })
    } catch (err) {
        next(err)
    }
}

exports.getAllEmployeesByEmployerID = async(req, res, next) => {
    try {
        const [rows] = await conn.execute('select * from users where type=2 and employer_id=? order by id DESC', [req.params.id])
        return res.status(200).send({
            message: "fetched",
            data: rows
        })
    } catch (err) {
        next(err)
    }
}

exports.getAllemployersEmployeeByEmploerId = async(req, res, next) => {
    try {
        var array = []
        const [rows] = await conn.execute('select * from users where employer_id=? order by id DESC', [req.params.id])
        for (var i of rows) {
            const [pro] = await conn.execute('select * from user_profile where user_id=?', [i.Id])
            if (pro.length > 0) {
                var object = pro[0]
                object['Designation'] = i.Designation
                array.push(object)
            } else {
                var obj = {
                    "id": i.Id,
                    "user_id": i.Id,
                    "name": i.Emp_Name,
                    "email": i.Email,
                    "number": i.Phone_Number,
                    "image": "",
                    "created_at": "",
                    "updated_at": "",
                    "state": i.State,
                    "Designation": i.Designation,
                    "city": i.City
                }
                array.push(obj)
            }
        }

        return res.status(200).send({
            message: "fetched",
            data: array
        })
    } catch (err) {
        next(err)
    }
}