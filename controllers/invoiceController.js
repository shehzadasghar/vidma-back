const conn = require('../dbconnection').promise();
var pdf = require('html-pdf');

exports.CreateInvoice = async(req, res, next) => {
    try {
        var date = new Date()
        var random_no = Math.random().toString().split('.')[1]
        const [chk] = await conn.execute('select * from invoices where task_id=?', [req.body.task_id])
        if (chk.length > 0) {
            return res.status(400).send({
                message: "already created"
            })
        } else {
            const [insert] = await conn.execute('insert into invoices (`billed_to`,`address`,`cost_per_hr`,`no_of_hrs`,`invoice_no`,`due_date`,`email`,`service_id`,`terms`,`status`,`employee_id`,`task_id`,`created_at`,`updated_at`) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
                req.body.billed_to,
                req.body.address,
                req.body.cost_per_hr,
                req.body.no_of_hrs,
                req.body.invoice_no,
                req.body.due_date,
                req.body.email,
                req.body.service_id,
                req.body.terms,
                req.body.status,
                req.body.employee_id,
                req.body.task_id,
                date,
                date
            ])
            if (insert.affectedRows == 1) {
                var html = `  <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; ">
          <h1>hellooo</h1>
        </div>`;
                var options = { format: 'Letter' };

                pdf.create(html, options).toFile(`./resources/static/assets/uploads/invoices/${random_no}.${date.toString().split(':')[0]}.pdf`, async(err, res) => {
                    if (err) return console.log(err);

                });
                const [lastinvoice] = await conn.execute('select * from invoices order by id DESC')
                const [update] = await conn.execute('update invoices set pdf=? where id=?', [`/resources/static/assets/uploads/invoices/${random_no}.${date.toString().split(':')[0]}.pdf`, lastinvoice[0].id])
                return res.status(201).send({
                    message: "created"
                })
            }
        }
    } catch (err) {
        next(err)
    }
}

exports.getTotalHoursAndInvoiceNo = async(req, res, next) => {
    try {
        const [getHours] = await conn.execute('select * from tasks where employee_id=? order by id DESC', [req.params.employee_id])
        const [getInvoice] = await conn.execute('select * from invoices')
        var receipt1 = getInvoice.length > 0 ? `00${req.params.employee_id}${parseInt(getInvoice[getInvoice.length-1].invoice_no)+1}` : `00${req.params.employee_id}0000000001`
        var receipt = getInvoice.length > 0 ? `00${req.params.employee_id}${receipt1.slice(-10)}` : receipt1
        var totalhours = 0
        for (var i of JSON.parse(getHours[0].array)) {
            if (i.timeout != "null") {
                var hours = Math.abs(new Date(i.timein).getTime() - new Date(i.timeout).getTime()) / 3600000
                totalhours = totalhours + hours
            }
        }
        return res.status(200).send({
            message: "success",
            totalhours: totalhours,
            invoice: receipt
        })

    } catch (err) {
        next(err)
    }
}

exports.getInvoicesByEmployeeId = async(req, res, next) => {
    try {
        const [getInvoice] = await conn.execute('select * from invoices where user_id=? order by id DESC', [req.params.employee_id])
        return res.status(200).send({
            message: "fetched",
            data: getInvoice
        })
    } catch (err) {
        next(err)
    }
}

exports.getInvoicesById = async(req, res, next) => {
    try {
        const [getInvoice] = await conn.execute('select * from invoices where id=?', [req.params.id])
        return res.status(200).send({
            message: "fetched",
            data: getInvoice
        })
    } catch (err) {
        next(err)
    }
}

exports.sendInvoice = async(req, res, next) => {
    try {
        const [send] = await conn.execute('update invoices set send=? where id=?', [1, req.body.id])
        if (send.affectedRows == 1) {
            return res.status(201).send({
                message: "success"
            })
        }
    } catch (err) {
        next(err)
    }
}

exports.getInvoicesByEmployerId = async(req, res, next) => {
    try {
        var array = []
        const [employees] = await conn.execute('select * from users where employer_id=?', [req.params.employer_id])
        for (var i of employees) {
            const [getInvoice] = await conn.execute('select * from invoices where user_id=?', [i.Id])
            if (getInvoice.length > 0) {
                array.push(getInvoice[0])
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