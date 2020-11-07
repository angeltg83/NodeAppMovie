const mysql = require("mysql");

const host = "localhost";

const user = process.env.DB_USER || "root";

const password = process.env.DB_PASS || "root";

const database = process.env.DB_DATABASE || "movieDB";

// const query = "SELECT * FROM actor";

module.exports = async () =>
  new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host,
      user,
      password,
      database,
    });
    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(connection);
    });
  });

