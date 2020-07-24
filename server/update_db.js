const mysql = require('mysql');
const axios = require('axios');
const moment = require('moment')

let host = process.env.production_host;
let user = process.env.production_user;
let password = process.env.production_password;
let database = process.env.production_db;

var connection = mysql.createConnection({
  host      : host,
  user      : user,
  password  : password,
  database  : database,
  port      : '3306'
})

connection.connect();

let create_current_vehicles_table = "CREATE TABLE IF NOT EXISTS current_vehicles (vehicle_id varchar(255) PRIMARY KEY,year varchar(255),make varchar(255),model varchar(255),reason varchar(255),tow_reference varchar(255),vin varchar(255), lot varchar(255), k varchar(255), comments varchar(255), front_pic varchar(255), back_pic varchar(255))";
connection.query(create_current_vehicles_table, function (error, results, fields) {
    if (error) throw error;
});

let currentMonth = moment().format('MMMM')
let currentYear = moment().format('YYYY')

// only run this when new json and photos are avialable.
axios.get('https://data.kcmo.org/resource/xpwx-fzzw.json')
  .then(function (response) {
    for(let i in response.data) {
      let query = 'INSERT INTO current_vehicles(vehicle_id, year, make, model, reason, tow_reference, vin, lot, k, comments, front_pic, back_pic) VALUES ?';
      let values = [
        [
          response.data[i].vehicle_id,
          response.data[i].year,
          response.data[i].make,
          response.data[i].model,
          response.data[i].reason,
          response.data[i].tow_reference,
          response.data[i].vin,
          response.data[i].lot,
          response.data[i].k,
          response.data[i].comments,
          `https://s3.us-east-2.amazonaws.com/kctowlots/${currentMonth}_${currentYear}_Front/${response.data[i].lot}_f.jpg`,
          `https://s3.us-east-2.amazonaws.com/kctowlots/${currentMonth}_${currentYear}_Back/${response.data[i].lot}_b.jpg`
        ]
      ]
      connection.query(query, [values], function (error, results, fields) {
          if (error) throw error;
            console.log(`Row added!`);
      });
    }
  })
  .catch(function (error) {
    console.log(error);
  });
