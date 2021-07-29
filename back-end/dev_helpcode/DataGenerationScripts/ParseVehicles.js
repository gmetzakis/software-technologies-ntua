const sql = require('./db.js');

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const filepath = '../electric_vehicles_data.json'

var query = "INSERT INTO ElectricVehicleType SET ?"
//var temphed = ['ID', 'Title']
var csvData = []

fs.readFile(filepath, (err, data) => {
    if (err) throw err;
    let vehicles = JSON.parse(data);

    for (index in vehicles['data']){
      let temp = {};
      temp['ID'] = index;
      temp['UUID'] = vehicles['data'][index]['id'];
      temp['Brand'] = vehicles['data'][index]['brand'];
      temp['Type'] = vehicles['data'][index]['type'];
      temp['BrandID'] = vehicles['data'][index]['brand_id'];
      temp['Model'] = vehicles['data'][index]['model'];
      temp['ReleaseYear'] = vehicles['data'][index]['release_year'];
      temp['Variant'] = vehicles['data'][index]['variant'];
      temp['UsableBatterySize'] = vehicles['data'][index]['usable_battery_size'];
      //console.log(temp);
      /*
      temp.push(vehicles['data'][index]['id']);
      temp.push(vehicles['data'][index]['brand']);
      temp.push(vehicles['data'][index]['type']);
      temp.push(vehicles['data'][index]['brand_id']);
      temp.push(vehicles['data'][index]['model']);
      temp.push(vehicles['data'][index]['release_year']);
      temp.push(vehicles['data'][index]['variant']);
      temp.push(vehicles['data'][index]['usable_battery_size']);*/
      sql.query(query,temp, (error, response) => {
              console.log(error || response);
            });
    }
    sql.end();

    //console.log(csvData);


});

/*
fs.readFile(filepath)
    .on('error', () => {
        // handle error
    })
    .on('data', (data) => {
      let something = JSON.parse(data);
      console.log(something);
        //console.log(row['EntityCreatedAt'].slice(0,20));
    })
    .on('end', () => {
      console.log('done');
      //console.log(csvData);
      for (var i = 0; i < csvData.length; i++) {
        sql.query(query,csvData[i], (error, response) => {
                console.log(error || response);
              });
      }*/
      /*sql.query(query,csvData, (error, response) => {
              console.log(error || response);
            })*/
        // handle end of CSV
    //})
