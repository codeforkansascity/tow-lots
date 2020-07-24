const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const mysql = require('mysql2')
const PORT = process.env.PORT || 5000
const app = express()

let host = process.env.production_host || "localhost"
let user = process.env.production_user || "root"
let password = process.env.production_password || "root"
let database = process.env.production_db || "mydb"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

var connection = mysql.createConnection({
  host      : host,
  user      : user,
  password  : password,
  database  : database,
  port      : '3306'
})

let create_current_vehicles_table = "CREATE TABLE IF NOT EXISTS current_vehicles (vehicle_id varchar(255) PRIMARY KEY,year varchar(255),make varchar(255),model varchar(255),reason varchar(255),tow_reference varchar(255),vin varchar(255), lot varchar(255), k varchar(255), comments varchar(255), front_pic varchar(255), back_pic varchar(255))";
connection.query(create_current_vehicles_table, function (error, results, fields) {
  if (error) throw error;
});

// table that will store vehicle ids and the user_id of the user who selected it
let create_saved_vehicles_table = "CREATE TABLE IF NOT EXISTS saved_vehicles (vehicle_id char(255), user_id int)";
connection.query(create_saved_vehicles_table, function (error, results, fields) {
  if (error) throw error;
});

// table will store users unique id, first and last name, email and password (not encrypted yet)
let create_users_table = "CREATE TABLE IF NOT EXISTS users (id int AUTO_INCREMENT PRIMARY KEY, first_name varchar(255), last_name varchar(255), email varchar(255), password varchar(255))";
connection.query(create_users_table, function (error, results, fields) {
  if (error) throw error;
})

app.get('/current_vehicles', function (req, res) {
  connection.query('SELECT * FROM current_vehicles', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  })
})

app.get('/saved_vehicles', function (req, res) {
  connection.query('SELECT * FROM saved_vehicles', function (error, results, fields) {
    if (error) throw error;
    res.send(results)
  })
})

app.post('/users', (req, res) => {
  let query = "INSERT INTO users(first_name, last_name, email, password) VALUES ?"
  let values = [[req.body.username, 'blank', req.body.email, req.body.password]]
  connection.query(query, [values], function (error, results, fields) {
    if (error) throw error;
  })
})

// saves vehicle_id and user_id into saved_vehicles table. Prevents users from entering duplicates
app.post('/save_vehicle', (req, res) => {
  let query = "INSERT INTO saved_vehicles(vehicle_id, user_id) SELECT * FROM (SELECT ?, ?) AS temp WHERE NOT EXISTS (SELECT vehicle_id FROM saved_vehicles WHERE vehicle_id = ?) LIMIT 1";
  let values = [req.body.vehicle_id, 1, req.body.vehicle_id]
  query = mysql.format(query, values)
  connection.query(query, function (error, results, fields) {
    if (error) throw error
  })
})

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.error(`Listening on port ${PORT}`);
});
