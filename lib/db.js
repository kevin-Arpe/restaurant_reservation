const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '105501',
    database: 'sqltutorial'
});

module.exports = db;