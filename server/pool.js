const mysql = require("mysql");
var pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    prot:3306,
    database:"xz",
    connectionLimit:15
});

module.exports = pool ;