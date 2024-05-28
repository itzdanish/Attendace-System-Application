const mysql = require("mysql");
const config = require("config");

var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : config.get("database.host"),
    user            : config.get("database.user"),
    password        : process.env.db_password,
    database        : config.get("database.name"),
    multipleStatements:true
});

module.exports = pool;