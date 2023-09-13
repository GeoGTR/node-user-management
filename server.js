const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from any origin (insecure, use a specific origin in production)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "mysql.default.svc.cluster.local",
  user: "root",
  password: "Ankasoft1!",
});

const createDatabaseQuery = "CREATE DATABASE IF NOT EXISTS test;";
const useDatabaseQuery = "USE test;";
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );

  INSERT INTO user (name, surname, email, password) VALUES
    ('Fatih', 'Özgür', 'fozgur@ankasoft.co', '123456')
`;

connection.query(createDatabaseQuery, (err) => {
  if (err) {
    console.error("Veritabanı oluşturma hatası:", err);
    connection.end();
    return;
  }

  // Oluşturulan veritabanını kullanma işlemi
  connection.query(useDatabaseQuery, (err) => {
    if (err) {
      console.error("Veritabanı seçme hatası:", err);
      connection.end();
      return;
    }

    // Tabloyu oluşturma işlemi
    connection.query(createTableQuery, (err) => {
      if (err) {
        console.error("Tablo oluşturma hatası:", err);
        connection.end();
        return;
      }

      console.log("Veritabanı ve tablo başarıyla oluşturuldu.");

      // Define a route to retrieve all users
      app.get("/all", (req, res) => {
        // Select all users from the MySQL database
        const query = "SELECT * FROM user";
        connection.query(query, function (err, results, fields) {
          if (err) {
            console.error("SQL Hatası:", err);
            return res
              .status(500)
              .json({ error: "Veritabanından veri alırken bir hata oluştu." });
          }
          console.log(results); // results contains rows returned by server
          res.status(200).json(results);
        });
      });

      app.get("/", (req, res) => {
        res.sendFile(__dirname + "/index.html"); // Replace 'index.html' with your actual HTML file path
      });

      app.get("/health", (req, res) => {
        res.sendStatus(200);
      });

      app.listen(port, () => {
        console.log(`App http://localhost:${port} adresinde dinleniyor.`);
      });

      app.post("/add", (req, res) => {
        const { name, surname, email, password } = req.query;

        connection.query(
          "INSERT INTO user (name, surname, email, password) VALUES (?,?,?,?)",
          [name, surname, email, password],
          (error, results) => {
            if (error) {
              console.error("SQL Hatası:", error);
              return res
                .status(500)
                .json({
                  error: "Veritabanına veri eklenirken bir hata oluştu.",
                });
            }

            // Başarılı durumda sadece 200 status kodu gönderiyoruz.
            res.sendStatus(200);
          }
        );
      });
    });
  });
});