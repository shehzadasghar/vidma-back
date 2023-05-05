const { json } = require('body-parser');

const conn = require('../dbconnection').promise();

exports.task = async(req, res, next) => {
    const [check] = await conn.execute('select * from schedule where employer_id=? and employee_id=? order by id DESC', [req.body.employer_id, req.body.employee_id])
    if (check.length > 0) {
        var date = new Date(check[0].date_end)
        if (date < new Date()) {
            const [rows] = await conn.execute('Insert into `schedule`(`employer_id`, `date_start`, `date_end`, `employee_id`, `employee_name`, `employee_designation`, `time_start`, `time_end`) VALUES (?,?,?,?,?,?,?,?)', [
                req.body.employer_id,
                req.body.date_start,
                req.body.date_end,
                req.body.employee_id,
                req.body.employee_name,
                req.body.employee_designation,
                req.body.time_start,
                req.body.time_end
            ]);
            if (rows.affectedRows == 1) {
                return res.status(201).send({
                    message: "Schedule made Successfully"
                });
            } else {
                return res.status(400).send({
                    message: "Failed"
                })
            }
        } else {
            return res.status(400).send({
                message: "alreday created"
            })
        }
    } else {
        const [rows] = await conn.execute('Insert into `schedule`(`employer_id`, `date_start`, `date_end`, `employee_id`, `employee_name`, `employee_designation`, `time_start`, `time_end`) VALUES (?,?,?,?,?,?,?,?)', [
            req.body.employer_id,
            req.body.date_start,
            req.body.date_end,
            req.body.employee_id,
            req.body.employee_name,
            req.body.employee_designation,
            req.body.time_start,
            req.body.time_end
        ]);
        if (rows.affectedRows == 1) {
            return res.status(201).send({
                message: "Schedule made Successfully"
            });
        } else {
            return res.status(400).send({
                message: "Failed"
            })
        }
    }
}

exports.getalltasks = async(req, res, next) => {
    try {
        const [task] = await conn.execute('Select * from schedule order by id DESC')
        return res.send(task)
    } catch (err) {
        next(err)
    }
}

exports.getbyemployerid = async(req, res, next) => {
    try {
        var array = []
        const [employerid] = await conn.execute('Select * from schedule where employer_id=? order by id DESC', [req.params.id])
        for (var i of employerid) {
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
            schedule: array
        })
    } catch (err) {
        next(err)
    }

}

exports.getbyemployeeid = async(req, res, next) => {
    try {
        const [employeeid] = await conn.execute('Select * from schedule where employee_id=? order by id DESC', [req.params.id])
        return res.send({
            schedule: employeeid
        })
    } catch (err) {
        next(err)
    }

}

exports.deletetask = async(req, res, next) => {
    try {
        const [rows] = await conn.execute('Delete from schedule where id =? ', [req.body.id]);

        if (rows.affectedRows == 1) {
            return res.status(201).json({
                message: "Deleted Successfully"
            });
        }
    } catch (err) {
        next(err)

    }
}

exports.updateschedule = async(req, res, next) => {
    const [rows] = await conn.execute('Update schedule set `employer_id`=?, `date_start`=?, `date_end`=?, `employee_id`=?, `employee_name`=?, `employee_designation`=?, `time_start`=?, `time_end`=? where id=?', [req.body.employer_id,
        req.body.date_start,
        req.body.date_end,
        req.body.employee_id,
        req.body.employee_name,
        req.body.employee_designation,
        req.body.time_start,
        req.body.time_end,
        req.body.id
    ])

    if (rows.affectedRows == 1) {
        return res.send({
            message: "Updated"
        })

    } else {
        return res.send({
            message: "Can not Update"
        })

    }
}

exports.getalltasksWithEmployeeProfileByEmployerId = async(req, res, next) => {
    try {
        var array = []
        const [rows] = await conn.execute('select * from schedule where employer_id=? order by id DESC', [req.params.employer_id])
        for (var i of rows) {
            var [users] = await conn.execute('select * from user_profile where user_id=?', [i.employee_id])
            if (users.length > 0) {
                i["name"] = users[0].name
                i["image"] = users[0].image
                array.push(i)
            }
        }
        return res.send({
            status: 200,
            data: array,
            message: "data fetched."
        })
    } catch (err) {
        next(err)
    }
}

exports.CreateTimeIn = async(req, res, next) => {
    try {
        // var date = new Date();
        // var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        // var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        // hours = hours < 10 ? "0" + hours : hours;
        // var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        // var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // var time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
        const [check] = await conn.execute('select * from schedule where id=?', [req.body.task_id])
        if (check.length > 0) {
            var date = new Date(check[0].date_end)
            if (date < new Date()) {
                var [taskss] = await conn.execute('select * from tasks where task_id=? and employee_id=?', [req.body.task_id, req.body.employee_id])
                var [chkInvoice] = await conn.execute('select * from invoices where task_id=?', [req.body.task_id])
                if (chkInvoice.length > 0) {
                    return res.status(400).send({
                        message: "task already completed"
                    })
                } else {
                    if (taskss.length > 0) {
                        var array2 = JSON.parse(taskss[0].array)
                        if (array2[array2.length - 1].timeout == 'null') {
                            return res.status(400).send({
                                message: "already timed in"
                            })
                        } else {
                            array2.push({
                                "timein": new Date(),
                                "timeout": "null",
                                "break": "null",
                                "date": new Date()
                            })
                            const [update] = await conn.execute('update tasks set array=?', [JSON.stringify(array2)])
                            if (update.affectedRows == 1) {
                                return res.status(201).send({
                                    message: "task made successfully"
                                });
                            } else {
                                return res.status(400).send({
                                    message: "Failed"
                                })
                            }
                        }
                    } else {
                        var array1 = []
                        array1.push({
                            "timein": new Date(),
                            "timeout": "null",
                            "break": "null",
                            "date": new Date()
                        })
                        const [rows] = await conn.execute('Insert into `tasks`(`task_id`, `employee_id`, `array`) VALUES (?,?,?)', [
                            req.body.task_id,
                            req.body.employee_id,
                            JSON.stringify(array1)
                        ]);
                        if (rows.affectedRows == 1) {
                            return res.status(201).send({
                                message: "task made successfully"
                            });
                        } else {
                            return res.status(400).send({
                                message: "Failed"
                            })
                        }
                    }
                }
            } else {
                return res.status(400).send({
                    message: "Time out"
                })
            }
        } else {
            return res.status(400).send({
                message: "task not found"
            })
        }
    } catch (err) {
        next(err)
    }
}


exports.CreateTimeOut = async(req, res, next) => {
    try {
        // var date = new Date();
        // var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        // var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        // hours = hours < 10 ? "0" + hours : hours;
        // var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        // var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // var time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
        const [check] = await conn.execute('select * from schedule where id=?', [req.body.task_id])
        if (check.length > 0) {
            var date = new Date(check[0].date_end)
            if (date < new Date()) {
                var [taskss] = await conn.execute('select * from tasks where task_id=? and employee_id=?', [req.body.task_id, req.body.employee_id])
                if (taskss.length > 0) {
                    var array2 = JSON.parse(taskss[0].array)
                    if (array2[array2.length - 1].timeout !== 'null') {
                        return res.status(400).send({
                            message: "already timed out"
                        })
                    } else {
                        const lastObject = array2[array2.length - 1];
                        lastObject.timeout = new Date();
                        array2[array2.length - 1] = lastObject;
                        const [update] = await conn.execute('update tasks set array=?', [JSON.stringify(array2)])
                        if (update.affectedRows == 1) {
                            return res.status(201).send({
                                message: "task made successfully"
                            });
                        } else {
                            return res.status(400).send({
                                message: "Failed"
                            })
                        }
                    }
                } else {
                    return res.status(400).send({
                        message: "task not found"
                    })
                }
            } else {
                return res.status(400).send({
                    message: "Time out"
                })
            }
        } else {
            return res.status(400).send({
                message: "task not found"
            })
        }
    } catch (err) {
        next(err)
    }
}



exports.CreateBreak = async(req, res, next) => {
    try {
        // var date = new Date();
        // var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        // var am_pm = date.getHours() >= 12 ? "PM" : "AM";
        // hours = hours < 10 ? "0" + hours : hours;
        // var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        // var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // var time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
        const [check] = await conn.execute('select * from schedule where id=?', [req.body.task_id])
        if (check.length > 0) {
            var date = new Date(check[0].date_end)
            if (date < new Date()) {
                var [taskss] = await conn.execute('select * from tasks where task_id=? and employee_id=?', [req.body.task_id, req.body.employee_id])
                if (taskss.length > 0) {
                    var array2 = JSON.parse(taskss[0].array)
                    if (array2[array2.length - 1].timeout !== 'null') {
                        return res.status(400).send({
                            message: "already timed out"
                        })
                    } else {
                        if (array2[array2.length - 1].break == 'null') {
                            const lastObject = array2[array2.length - 1];
                            lastObject.break = new Date();
                            array2[array2.length - 1] = lastObject;
                            const [update] = await conn.execute('update tasks set array=?', [JSON.stringify(array2)])
                            if (update.affectedRows == 1) {
                                return res.status(201).send({
                                    message: "task made successfully"
                                });
                            } else {
                                return res.status(400).send({
                                    message: "Failed"
                                })
                            }
                        } else {
                            const lastObject = array2[array2.length - 1];
                            var date1 = new Date(lastObject.break);
                            var date2 = new Date()
                            const sumDates = new Date(date1.getTime() + date2.getTime());
                            lastObject.break = sumDates;
                            array2[array2.length - 1] = lastObject;
                            const [update] = await conn.execute('update tasks set array=?', [JSON.stringify(array2)])
                            if (update.affectedRows == 1) {
                                return res.status(201).send({
                                    message: "task made successfully"
                                });
                            } else {
                                return res.status(400).send({
                                    message: "Failed"
                                })
                            }
                        }
                    }
                } else {
                    return res.status(400).send({
                        message: "task not found"
                    })
                }
            } else {
                return res.status(400).send({
                    message: "Time out"
                })
            }
        } else {
            return res.status(400).send({
                message: "task not found"
            })
        }
    } catch (err) {
        next(err)
    }
}