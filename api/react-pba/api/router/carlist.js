const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');
const db = require('../db/mysql');

module.exports = {
    reg(app) {
        app.get('/carlist', async (req, res) => {
            var username = req.query.username;
            var usergetsql = `select * from shoppingcart where username='${username}'`;
            await db.select(usergetsql, function(result) {
                console.log(apiResult(true,result));
                res.send(apiResult(true,result));
            });
        })

        app.post('/minuscarlist', async (req, res) => {
            var minusql = `update shoppingcart set proqty=proqty-1 where id='${req.body.id}'`;
            var usergetsql = 'SELECT * from shoppingcart';
            await db.select(minusql, function(res0) {
                db.select(usergetsql, function(result){
                    console.log(result)
                    res.send(apiResult(true,result));
                })
            })
        })

        app.post('/addcarlist', async (req, res) => {
            var addsql = `update shoppingcart set proqty=proqty+1 where id='${req.body.id}'`;
            var usergetsql = 'SELECT * from shoppingcart';
            await db.select(addsql, function(res0) {
                db.select(usergetsql, function(result) {
                    console.log(result)
                    res.send(apiResult(true,result));
                })
            })
        })

        app.post('/updatecarlist', async (req, res) => {
            var updatesql = `update shoppingcart set qty=${req.body.proqty}*1 where id='${req.body.id}'`;
            var usergetsql = `select * from shoppingcart`;
            await db.select(usergetsql, function(result) {
                res.send(result);
            })
        })

        app.post('/updatecarlist2', async (req, res) => {
            console.log(req.body)
            var updatesql = `update shoppingcart set proqty=${req.body.proqty}*1 where id='${req.body.id}'`;
            var usergetsql = `select * from shoppingcart where username='${req.body.username}'`;
            await db.select(updatesql, function(res0) {
                db.select(usergetsql, function(result) {
                    res.send(apiResult(true,result))
                })
            })
        })

        app.post('/updatecarlist3', async (req, res) => {
            var usergetsql = `select * from shoppingcart where id='${req.body.id}'`;
            db.select(usergetsql, function(result) {
                res.send(result)
            })
        })

        app.post('/delcarlist', (req, res) => {
            var delsql = `delete from shoppingcart where id='${req.body.id}'`;
            var usergetsql = `select * from shoppingcart where username='${req.body.username}'`;
            db.select(delsql, function(res0) {
                db.select(usergetsql, function(result) {
                    res.send(apiResult(true, result))
                })
            })
        })

        app.post('/delcarlist', (req, res) => {
            var delsql = `delete from shoppingcart where username='${req.body.username}'`;
            console.log(req.body.username)
            var usergetsql = `select * from shoppingcart where username='${req.body.username}'`;
            db.select(delsql, function(res0) {
                db.select(usergetsql, function(result) {
                    res.send(apiResult(true, result))
                })
            })
        })

        app.post('/order', (req, res) => {
            let idarray = req.body.id;
            if(typeof(idarray) == 'string') {
                var usergetsql = 'select * from shoppingcart where id=' + idarray;
            } else {
                var usergetsql = 'select * from shoppingcart where';
                idarray.forEach((item) => {
                    usergetsql += ' id=' + item + ' or'
                })
                usergetsql += ' 1=2';
            }
            db.select(usergetsql, function(result) {
                res.send(result)
            })
        })

        app.post('/address', (req, res) => {
            var insertsql = `insert into address (consignee, phone, username, totaladdress) values ('${req.body.consignee}','${req.body.phone}','${req.body.username}','${req.body.totaladdress}')`;
            db.select(insertsql, function(result) {
                res.send(apiResult(true, result))
            })
        })

        app.get('/getaddress', (req, res) => {
            // var usergetsql = 'select * from address';
            // var username = req.query.username;
        
            var usergetsql = `select * from address where username='${req.query.username}'`;
            // console.log(usergetsql)
            db.select(usergetsql, function(result) {
                res.send(apiResult(true, result))
            })
        })

        app.get('/deladdress', (req, res) => {
            console.log(req.query)
            // var usergetsql = 'delete from address';
            var delsql = `delete from address where id='${req.query.id}'`;
            var usergetsql = `select * from address where username='${req.query.username}'`;
            console.log(delsql,usergetsql)
            db.select(delsql, function(res0) {
                db.select(usergetsql, function(result) {
                    res.send(apiResult(true, result))
                })
            })
            // db.select(usergetsql, function(result) {
            //     res.send(apiResult(true, result))
            // })
        })
    }
}