/** Database setup for BizTime. */

const {Client} = require("pg");

let DB_URI;

DB_URI = "postgresql:///biztime"

let db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'biztime',
    password: 'postgres',
    port: 5432 
});

db.connect();

module.exports = db;