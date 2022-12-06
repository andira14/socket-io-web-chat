const Database = require("../db/Database");

module.exports = class User{
    static async register(req, res) {
        const {username, password} = req.body;
        const result = await Database.db.get('SELECT * FROM users WHERE username = ?', [username]);
        if(result === undefined){
            await Database.db.run('INSERT INTO users(username, password, created_at) VALUES (?,?,?)', username, password, new Date().getTime());
        }
        return res.json({success: result === undefined});
    }

    static async login(req, res) {
        const {username, password} = req.body;
        const result = await Database.db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        return res.json({success: result !== undefined});
    }
}