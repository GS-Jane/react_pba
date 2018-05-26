const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');
const db = require('../db/mysql');

module.exports = {
    reg(app) {
        app.post('/listtodetail', async (req, res) => {
            var id = req.body.id;
            var sql = `select * from goods where id='${id}'`;
            // console.log(id)
            await db.select(sql, function(result) {
                res.send(apiResult(true, result))
            })
        })

        app.post('/insertnewcarlist', async (req, res) => {
            let username = req.body.username;
            let id = req.body.id;
            let proqty = req.body.proqty;
            let imgurl =req.body.imgurl;
            let proname=req.body.proname;
            let proprice=req.body.proprice;
            let sql = `insert into shoppingcart (username,id,proqty,imgurl,proprice,proname) values ('${username}','${id}','${proqty}','${imgurl}','${proprice}','${proname}')`;
            console.log(sql)
            let _sql = `select * from shoppingcart where id='${id}' and username='${username}'`;
            let updatesql = `update shoppingcart set proqty=proqty + '${proqty}' where id='${id}' and username='${username}'`;
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
    }
}