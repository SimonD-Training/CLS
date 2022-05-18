const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
const database = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPWORD,
    database: process.env.DB
});
database.connect((err) => {
    if (err) console.log(err);
})

module.exports = database;