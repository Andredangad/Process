var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var exists = fs.existsSync();

app.use(express.static('public'));


var mysql = require('mysql');

// Mettre ses identifiants MYSQL ici

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dangandre"
});

var jsonParser = bodyParser.json();
if (!exists) {
    con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS products (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), descri VARCHAR(255), visibility VARCHAR(30))";
  con.query(sql, function (err, result) {
    if (err) throw err;

  });
});}

app.get('/', function(request, response) {
	
  response.sendFile(__dirname + '/views/index.html');
  
  


});



app.get('/update/:id/', function(request, response) {
	
  response.sendFile(__dirname + '/views/update_product.html');
  id: request.params.id;
   var sql = ('SELECT * FROM products WHERE id = "'+request.params.id+'"');
  con.query(sql, function (err,result,rows) {
    if (err) throw err;
	
	console.log(result);

  });


});

app.get('/add', function(request, response) {
  response.sendFile(__dirname + '/views/add_product.html');

});

app.post('/addUser', jsonParser, function(request, response) {


insert(request);


});


app.post('/recup', jsonParser, function(request, response)  {


show(request);


  var sql = ('SELECT * FROM products WHERE name = "'+request.body.name+'"');
  con.query(sql, function (err,rows) {
    if (err) throw err;
	
	
response.send(rows);


});
   
	
  });
  


var show = function (req)
{

  var sql = ('SELECT * FROM products WHERE name = "'+req.body.name+'"');
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
}

var insert = function (req)
{

  var sql = ('INSERT INTO products (name, descri) VALUES ("'+req.body.name+'","'+req.body.desc+'")');
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Un produit a été inseré");
  });
}

var listener = app.listen(3000, function() {
  console.log('Your app is listening on port 3000');
});