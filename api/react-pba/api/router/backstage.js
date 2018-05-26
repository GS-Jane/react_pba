const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');
const db = require('../db/mysql');

module.exports = {
    reg(app) {
        // 后台登录
        app.get('/backlogin', async (req, res) => {
            let username = req.query.username;
            let password = req.query.password;
            var sql = `select * from administrator where username='${username}' and password='${password}'`;
            console.log(sql);
            await db.select(sql, (data) => {
                console.log(data)
                if(data.length == 0) {
                    res.send(apiResult(false));
                } else {
                    res.send(apiResult(true))
                }
            })
        })

        //查询所有用户
        app.get('/allusers', async (req, res) => {
            var sql = 'SELECT * FROM users';
            console.log(sql)
            await db.select(sql, (result) => {
                res.send(apiResult(result.length > 1, result));
            })
        })

        //后台产品管理之所有商品
        app.get('/allproduct', async (req, res) => {
            var sql = 'SELECT * FROM goods';
            console.log(sql)
            await db.select(sql, (result) => {
                res.send(apiResult(result.length > 1, result));
            })
        })

         //分页
        app.get('/paging', async (req, res) => {
            var page = req.query.page;
            var sql = `select * from goods limit ${(page)*10},10`;
            console.log(sql);
            await db.select(sql, function(result) {
                res.send(apiResult(result.length>1, result));
            })
        })



        //增加
        app.post('/addproduct', async (req, res) => {
            let sql = `insert into goods (imgurl,brand,proname,prodescription,proprice,proicon,category) values ('${imgurl}','${brand}','${proname}','${prodescription}','${proprice}','${proicon}','${category}')`;
            console.log(sql)
            let _sql = `select * from goods where id='${id}' and username='${username}'`;
            let updatesql = `update goods set proqty=proqty + '${proqty}' where id='${id}' and username='${username}'`;
            await db.select(_sql, function(_result) {
                if(_result.length != 0) {
                    db.update(updatesql, function(up_result) {
                        res.send(apiResult(true,up_result));
                    })
                } else {
                    db.insert(sql, function(result) {
                        res.send(apiResult(true,result))
                    })
                }
            })
        })

        //删除
        app.post('/delproduct', (req, res) => {
            var delsql = `delete from goods where id='${req.body.id}'`;
            var usergetsql = `select * from goods where username='${req.body.username}'`;
            db.select(delsql, function(res0) {
                db.select(usergetsql, function(result) {
                    res.send(apiResult(true, result))
                })
            })
        })        

        app.post('/delproduct', (req, res) => {
            var delsql = `delete from goods where username='${req.body.username}'`;
            console.log(req.body.username)
            var usergetsql = `select * from goods where username='${req.body.username}'`;
            db.select(delsql, function(res0) {
                db.select(usergetsql, function(result) {
                    res.send(apiResult(true, result))
                })
            })
        })

       

        //后台模糊搜索
        app.get('/backsearch', async (req, res) => {
            let proparams = req.query.proparams;
            console.log(proparams);
            await db.select(`select * from goods where proname like "%${proparams}%" or category like "%${proparams}%"`, function(result) {
                console.log(result);
                if(result.length>0){
                    res.send({status: true, data: result});
                } else {
                    res.send({status: 'error'})
                }
            })
        })

    }
}