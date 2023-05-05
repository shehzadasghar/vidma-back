const conn = require('../dbconnection').promise();

exports.CreateService = async(req, res, next) => {
    try {
        var date = new Date()
        const [insert] = await conn.execute('insert into services (`description`,`created_at`,`updated_at`) values (?,?,?)', [
            req.body.description,
            date,
            date
        ])
        if (insert.affectedRows == 1) {
            return res.status(201).send({
                message: "created"
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.UpdateService = async(req, res, next) => {
    try {
        var date = new Date()
        const [insert] = await conn.execute('update services set `description`=?,`updated_at`=? where id=?', [
            req.body.description,
            date,
            req.body.id
        ])
        if (insert.affectedRows == 1) {
            return res.status(201).send({
                message: "updated"
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.getService = async(req, res, next) => {
    try {
        var date = new Date()
        const [rows] = await conn.execute('select * from services')
        return res.status(201).send({
            message: "fetched",
            data: rows
        })
    } catch (err) {
        next(err)
    }
}

exports.getServiceById = async(req, res, next) => {
    try {
        var date = new Date()
        const [rows] = await conn.execute('select * from services where id=?', [req.params.id])
        return res.status(201).send({
            message: "fetched",
            data: rows
        })
    } catch (err) {
        next(err)
    }
}