const mysql = require('mysql');
const apiResult = require('../utils/apiResult');

var connection  = mysql.createConnection({  
  
   host:'localhost',  
   user:'root',//账号  
   password:'',//密码  
   database:'reactpba' //数据库名字  

});  
connection.connect();  
  
//查询数据  
module.exports = {
    select: function (sql,callback){  
        connection.query(sql, function(err, rows, fields) {  
            if (err) throw err;  
            callback(rows);  
        });  
        //connection.end();  
    },
    insert: function (sql, callback) {
        connection.query(sql, function(err, rows, fields) {
            if(err) throw err;
            callback(rows)
        })
    },
    update: function (sql, callback) {
        connection.query(sql, function(err, rows, fields) {
            if(err) throw err;
            callback(rows)
        })
    }
     
    
}



// module.exports db;