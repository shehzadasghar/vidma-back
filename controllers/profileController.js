const uploadProfiles = require("../middleware/profileUpload");
var express = require('express');
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const conn = require('../dbconnection').promise();
exports.profileInsert = async(req, res) => {
    try {
        await uploadProfiles(req, res);
        if (req.file == undefined || req.file.originalname == undefined) {
            res.status(400).send({
                message: "please upload the file"
            })
        } else {
            const [images] = await conn.execute('select * from user_profile where image=?', [`/resources/static/assets/uploads/profiles/${req.file.originalname}`])
            if (images.length > 0) {
                res.status(700).send({
                    message: `already exist: ${req.file.originalname}`,
                });

            } else {
                if (req.file == undefined) {
                    return res.status(400).send({ message: "Please upload a file!" });
                }
                res.status(200).send({
                    result: req.file.originalname,
                });
            }
        }
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    } finally {
        if (req.file == undefined || req.file.originalname == undefined) {

        } else {
            const [images] = await conn.execute('select * from user_profile where image=?', [`/resources/static/assets/uploads/profiles/${req.file.originalname}`])
            if (images.length > 0) {} else {
                let path = "/resources/static/assets/uploads/profiles/" + req.file.originalname;
                var date = new Date()
                const [insertt] = await conn.execute("insert into user_profile(`image`,`user_id`,`name`,`email`,`number`,`state`,`city`,`created_at`,`updated_at`) VALUES (?,?,?,?,?,?,?,?,?)", [
                    path,
                    req.body.user_id,
                    req.body.name,
                    req.body.email,
                    req.body.number,
                    req.body.state,
                    req.body.city,
                    date,
                    date
                ]);
            }
        }

    }
}

exports.updateProfiles = async(req, res) => {
    try {
        var arrow = await uploadProfiles(req, res);
        arrow
        const [rows] = await conn.execute('select * from user_profile where id=?', [req.body.id]);
        var paths = rows[0].image.slice(42)
        var paths1 = rows[0].image.slice(1)
            // console.log(paths)
        if (req.file == undefined || req.file.originalname == undefined) {

        } else {
            if (paths !== req.file.originalname) {
                arrow
                await unlinkAsync(paths1);
            }
        }
        // res.status(200).send({
        //     result: "success",
        // });
    } catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    } finally {
        if (req.file == undefined || req.file.originalname == undefined) {
            var date = new Date()
            const [update] = await conn.execute('update user_profile set `name`=?,`email`=?,`number`=?,`state`=?,`city`=?,`updated_at`=? where id=?', [
                req.body.name,
                req.body.email,
                req.body.number,
                req.body.state,
                req.body.city,
                date,
                req.body.id
            ])
            return res.status(200).send({
                result: "success",
            });
        } else {
            let path = "/resources/static/assets/uploads/profiles/" + req.file.originalname;
            var date = new Date()
            const [update] = await conn.execute('update user_profile set `image`=?,`name`=?,`email`=?,`number`=?,`state`=?,`city`=?,`updated_at`=? where id=?', [
                path,
                req.body.name,
                req.body.email,
                req.body.number,
                req.body.state,
                req.body.city,
                date,
                req.body.id
            ])
            return res.status(200).send({
                result: "success",
            });
        }
    }
}

exports.getProfiles = async(req, res, next) => {
    try {
        const [rows] = await conn.execute('select * from user_profile where user_id=? order by id DESC', [req.params.id])
        return res.status(200).send({
            message: "fetched",
            data: rows
        })
    } catch (err) {
        next(err)
    }

}