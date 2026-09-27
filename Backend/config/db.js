const mysql = require("mysql2/promise");

require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// TEST DATABASE
(async () => {
  try {
    const [dbResult] = await pool.query("SELECT DATABASE() AS database_name");

    console.log("NODE DATABASE:", dbResult[0].database_name);

    const [columns] = await pool.query("SHOW COLUMNS FROM questions");

    console.log(
      "NODE QUESTIONS COLUMNS:",
      columns.map((column) => column.Field),
    );
  } catch (error) {
    console.error("DATABASE TEST ERROR:", error.message);
  }
})();

module.exports = pool;
