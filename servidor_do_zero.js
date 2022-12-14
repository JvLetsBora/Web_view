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
app.get("/player1", (req, res) => {
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

app.post("/atualizar1", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Isso é importante para evitar o erro

  sql = `INSERT INTO player1 (vida, pocoes) VALUES (${req.body.vida},${req.body.pocoes})`;
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  console.log(sql);
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    } else console.log(sql);
  });
  db.close(); // Fecha o banco
  res.end();
});

// Exclui um registro
app.delete("/deletar1", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Isso é importante para evitar erro

  sql = `DELETE FROM player1 WHERE vida > ${req.body.vida} `;
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    }
    res.end();
  });
  db.close(); // Fecha o banco
});

app.get("/player2", (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Isso é importante para evitar o erro de CORS

  var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = "SELECT * FROM player2 ORDER BY status COLLATE NOCASE";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
  db.close(); // Fecha o banco
});

app.post("/atualizar2", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Isso é importante para evitar o erro

  sql = `INSERT INTO player2 (vida, pocoes) VALUES (${req.body.vida},${req.body.pocoes})`;
  var db = new sqlite3.Database(DBPATH); // Abre o banco
  console.log(sql);
  db.run(sql, [], (err) => {
    if (err) {
      throw err;
    } else console.log(sql);
  });
  db.close(); // Fecha o banco
  res.end();
});

// Exclui um registro
app.delete("/deletar2", urlencodedParser, (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*"); // Isso é importante para evitar erro

  sql = `DELETE FROM player2 WHERE vida > ${req.body.vida}`;
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
