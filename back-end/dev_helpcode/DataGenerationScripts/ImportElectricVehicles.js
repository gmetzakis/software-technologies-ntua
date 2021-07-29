const sql = require('./db.js');

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const filepath = '../electric_vehicles_data.json'

var query = "INSERT INTO ElectricVehicle SET ?"
//var temphed = ['ID', 'Title']
var csvData = []

for (var i = 1; i < 200; i++) {
  temp = {}
  temp['ID'] = i;
  temp['EVTypeID'] = 1 + Math.floor(Math.random() * 141);
  sql.query(query,temp, (error, response) => {
          console.log(error || response);
        });
};

sql.end();
