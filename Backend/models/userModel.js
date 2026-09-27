const db = require("../config/db");

const createUser = (name, email, password) => {
    return db.query(
        `INSERT INTO users (name, email, password)
         VALUES (?, ?, ?)`,
        [name, email, password]
    );
};

const findUserByEmail = (email) => {
    return db.query(
        `SELECT id, name, email, password, role
         FROM users
         WHERE email = ?`,
        [email]
    )
    .then(([rows]) => {
        return rows[0];
    });
};

module.exports = {
    createUser,
    findUserByEmail
};