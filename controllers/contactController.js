const conn = require('../dbconnection').promise();

exports.CreateContact = async(req, res, next) => {
    try {
        var date = new Date()
        if (req.body.contact == 2) {
            const [rows] = await conn.execute('select * from users where id=?', [req.body.employee_id])
            const [insert] = await conn.execute('insert into contact_us (`employer_id`,`employee_id`,`conatct`,`subject`,`message`,`created_at`,`updated_at`) values (?,?,?,?,?,?,?)', [
                rows[0].employer_id,
                req.body.employee_id,
                req.body.contact,
                req.body.subject,
                req.body.message,
                date,
                date
            ])
            if (insert.affectedRows == 1) {
                return res.status(201).send({
                    message: "created"
                })
            }
        } else {
            const [insert] = await conn.execute('insert into contact_us (`employer_id`,`conatct`,`subject`,`message`,`created_at`,`updated_at`) values (?,?,?,?,?,?)', [
                req.body.employer_id,
                req.body.contact,
                req.body.subject,
                req.body.message,
                date,
                date
            ])
            if (insert.affectedRows == 1) {
                return res.status(201).send({
                    message: "created"
                })
            }
        }
    } catch (err) {
        next(err)
    }
}

exports.getContactEmployer = async(req, res, next) => {
    try {
        var array = []
        const [rows] = await conn.execute('select * from contact_us where employer_id=? and conatct=? order by id DESC', [req.params.id, 2])
        for (var i of rows) {
            const [users] = await conn.execute('select * from users where id=?', [i.employee_id])
            i['Emp_Name'] = users.length > 0 ? users[0].Emp_Name : ""
            i['Phone_Number'] = users.length > 0 ? users[0].Phone_Number : ""
            i['Email'] = users.length > 0 ? users[0].Email : ""
            i['Designation'] = users.length > 0 ? users[0].Designation : ""
            array.push(i)
        }
        return res.status(200).send({
            message: "fetched",
            data: array
        })
    } catch (err) {
        next(err)
    }
}

exports.getContactAdmin = async(req, res, next) => {
    try {
        var array = []
        const [rows] = await conn.execute('select * from contact_us where conatct=? order by id DESC', [1])
        for (var i of rows) {
            const [users] = await conn.execute('select * from users where id=?', [i.employer_id])
            i['Emp_Name'] = users.length > 0 ? users[0].Emp_Name : ""
            i['Phone_Number'] = users.length > 0 ? users[0].Phone_Number : ""
            i['Email'] = users.length > 0 ? users[0].Email : ""
            i['Designation'] = users.length > 0 ? users[0].Designation : ""
            array.push(i)
        }
        return res.status(200).send({
            message: "fetched",
            data: array
        })
    } catch (err) {
        next(err)
    }
}