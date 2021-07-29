const sql = require('./db.js');

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const filepath = '../electric_vehicles_data.json'

var query = "INSERT INTO EnergyPrices SET ?"
//var temphed = ['ID', 'Title']


for (var i = 1; i < 26; i++) {
  temp = {}
  temp['ID'] = i;
  temp['EnergyProviderID'] = 1 + Math.floor(Math.random() * 7);
  temp['CostPerKWH'] = 0.1 + Math.floor(Math.random() * 100)*0.001;
  sql.query(query,temp, (error, response) => {
          console.log(error || response);
        });
};

sql.end();
