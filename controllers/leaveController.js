const conn = require('../dbconnection').promise();


exports.CreateLeaveRequest = async(req, res, next) => {
    try {
        var date = new Date()
        const [getEmployerId] = await conn.execute('select * from users where id=?', [req.body.employee_id])
        if (getEmployerId.length > 0) {
            const [createRequest] = await conn.execute('insert into leave_requests (`employee_id`,`employer_id`,`employee_name`,`employee_designation`,`start_date`,`end_date`,`description`,`created_at`,`updated_at`) value (?,?,?,?,?,?,?,?,?)', [
                req.body.employee_id,
                getEmployerId[0].employer_id,
                req.body.employee_name,
                req.body.employee_designation,
                req.body.start_date,
                req.body.end_date,
                req.body.description,
                date,
                date
            ])
            if (createRequest.affectedRows == 1) {
                return res.status(201).send({
                    message: "created"
                })
            }
        } else {
            return res.status(400).send({
                message: "employee id is incorrect"
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.UpdateRequestStatus = async(req, res, next) => {
    try {
        const [updateStatus] = await conn.execute('update leave_requests set `status`=? where id=?', [req.body.status, req.body.id])
        if (updateStatus.affectedRows == 1) {
            return res.status(200).send({
                message: "updated"
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.getRequestByEmployerId = async(req, res, next) => {
    try {
        var array = []
        const [getRequest] = await conn.execute('select * from leave_requests where `employer_id`=?', [req.params.employer_id])
        for (var i of getRequest) {
            const [pro] = await conn.execute('select * from user_profile where user_id=?', [i.employee_id])
            if (pro.length > 0) {
                i['image'] = pro[0].image
                array.push(i)
            } else {
                i['image'] = ""
                array.push(i)
            }
        }
        return res.send({
            data: array
        })
    } catch (err) {
        next(err)
    }
}


exports.getRequestByEmployeeId = async(req, res, next) => {
    try {
        const [getRequest] = await conn.execute('select * from leave_requests where `employee_id`=?', [req.params.employee_id])

        return res.send({
            data: getRequest
        })
    } catch (err) {
        next(err)
    }
}