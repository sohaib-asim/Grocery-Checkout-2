const express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('stock.db');
var dbusers = new sqlite3.Database('users.db');


const app = express();
const port = 3006;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));


app.post('/getItem/', (request, response) => {
  console.log(request.body.barcode)
  var sql = `SELECT img, Name, Price, Quantity FROM stock WHERE Barcode = ${request.body.barcode}`;
  db.all(sql, [], (err, rows) => {
  response.send(rows);  
});
});


app.get('/getItems/', (request, response) => {
  var sql = `SELECT * FROM stock`;
  db.all(sql, [], (err, rows) => {
    console.log(rows);
  response.send(rows);  
  });
});



app.get('/getPrice/', (request, response) => {
  var sql = `SELECT * FROM items`;
  db.all(sql, [], (err, rows) => {
  response.send(rows);  
  });
});

app.post('/getUsers/', (request, response) => {
  var sql = `SELECT count(*) FROM users WHERE id = '${request.body.userid}' AND password = '${request.body.pwd}'`;
  dbusers.all(sql, [], (err, rows) => {
    response.send(rows);  
  });
});

app.post('/pay/', function (req, res) {
  let sql2 = `INSERT INTO transactions (payment, amount) VALUES ('${req.body.payment}', ${req.body.amount})`;
  db.exec(sql2);
  db.all("SELECT * from transactions", [], (err, rows) => {
    console.log(rows);
  });
});

let sql = 'SELECT * FROM items WHERE price > 4';
console.log(sql);

/*db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});
*/
