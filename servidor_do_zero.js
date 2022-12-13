const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const sqlite3 = require("sqlite3").verbose();
const DBPATH = "game.db";

const hostname = "127.0.0.1";
const port = 3020;
const app = express();

/* Servidor aplicação */

app.use(express.static("./"));

/* Definição dos endpoints */

/******** CRUD ************/

app.use(express.json());

// Retorna todos registros (é o R do CRUD - Read)
app.get("/players", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = "SELECT * FROM player1 ORDER BY status COLLATE NOCASE";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

app.patch("/atualizar", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Isso é importante para evitar o erro
  sql = `UPDATE player1 SET vida = '${3}', status = '${4}', pocoes = '${
    req.body.pocoes
  }'`;
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.end();
  });
  db.close(); // Fecha o banco
});

app.listen(port, hostname, () => {
  console.log(`Page server running at http://${hostname}:${port}/`);
});
