const sqlite3 = require("sqlite3").verbose();

// Create and connect database
let db = new sqlite3.Database("dashboard.db", (e) => {
    if (e) {
        console.error(e.message);
    } else {
        console.log("Database connected");
    }
});

db.serialize(() => {

    db.run(
        `
        CREATE TABLE IF NOT EXISTS Users (
            userId INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT,
            lastName TEXT,
            email TEXT,
            password TEXT
        )
        ` // ^^^ Passwords should be hashed and salted??
    ); 
});

export async function add(user) {
    try {
        const { firstName, lastName, email, password } = user;

        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash(password, 10); //Hash password

        db.run(`
            INSERT OR IGNORE INTO Users ()
            VALUES (?, ?, ?, ?)`,
            [firstName, lastName, email, hashedPassword],
            function (e) {
                if (e) {
                    console.error(e.message);
                }
                console.log(`Inserted user with ID ${userId}`);
            }
        );
    } catch (e) {
        console.error(e);
    }
}

module.exports = db;