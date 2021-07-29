const sql = require('./db.js');

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const filepath = '../electric_vehicles_data.json'

var query = "INSERT INTO EnergyProviders SET ?"
//var temphed = ['ID', 'Title']
var providers = ['DEY','HRWN','Energa','Energizer','Watt&Volt','Tesla Energy','Greek Energy Providers',
                'Anonymoi Paroxoi Energeias']


for (var i = 1; i < 9; i++) {
  temp = {}
  console.log(i);
  temp['ID'] = i;
  temp['Title'] = providers[i]
  sql.query(query,temp, (error, response) => {
          console.log(error || response);
        });
};

sql.end();
