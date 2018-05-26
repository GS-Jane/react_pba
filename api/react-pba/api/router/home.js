const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');
const db = require('../db/mysql');

module.exports = {
    reg(app) {
        app.get('/pbahome', async (req, res) => {
            var sql = 'SELECT * FROM goods';
            console.log(sql)
            await db.select(sql, (result) => {
                res.send(apiResult(result.length > 1, result));
            })
        })

        app.get('/pbafuzzysearch', async (req, res) => {
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