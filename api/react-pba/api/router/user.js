const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');
const db = require('../db/mysql');

module.exports = {
    reg(app) {
        app.get('/login', async (req, res) => {
            
            let username = req.query.username;
            let password = req.query.password;
            var sql = `select * from users where username='${username}' and password='${password}'`;
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

        app.get('/reg', async (req, res) => {
            let username = req.query.username;
            let password = req.query.password;
            console.log(username,password);
            var sql_one = `select * from users where username='${username}'`;
            var sql_two = `insert into users(username, password) values('${username}', '${password}')`;
            await db.select(sql_one, function(data) {
                if(data.length != 0) {
                    res.send(apiResult(false));
                } else {
                    db.insert(sql_two, function(_data) {
                        res.send(apiResult(true));
                    })
                }
            }) 
        })
    }
}