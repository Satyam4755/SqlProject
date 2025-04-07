const mysql=require('mysql2');
// creating the pool of connections for the database instead of making the specific connections

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'02112004',
    database:'AirBnBProject'
})
module.exports= pool.promise();