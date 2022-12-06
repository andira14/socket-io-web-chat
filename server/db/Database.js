const {open} = require('sqlite');
const sqlite3 = require('sqlite3');

module.exports = class Database {
    static db;

    static async initialize() {
        const db = await open({
            driver: sqlite3.Database,
            filename: `${__dirname}/chat.db`
        })
    
        db.run(`CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(255) PRIMARY KEY,
            password VARCHAR(255),
            created_at LONG
        )`);

        Database.db = db;
    };
}

