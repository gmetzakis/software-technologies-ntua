const sql = require('./db.js');

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const filepath = '../acn_data/caltech_acndata_sessions_12month.json'

var query = "INSERT INTO Sessions SET ?"
//var temphed = ['ID', 'Title']
var csvData = []
let month_dict = {'Jan':"01","Feb":"02","Mar":"03","Apr":"04","May":"05","Jun":'06',
                  'Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12'}

function datetimecovert(s){
  if (s === null){
    return null;
  }
  let something  = s;
  let day = something.slice(5,7);
  let month = something.slice(8,11);
  month = month_dict[month]
  let year = something.slice(12,16);
  let time = something.slice(17,25);
  let total = year + '-' + month + '-' + day + ' ' + time
  return total
}

fs.readFile(filepath, (err, data) => {
    if (err) throw err;
    let vehicles = JSON.parse(data);
    for (index in vehicles['_items']){
      let temp = {};
      temp['ID'] = vehicles['_items'][index]['sessionID'];
      temp['ConnectionTime'] = datetimecovert(vehicles['_items'][index]['connectionTime']);
      temp['DisconnectTime'] = datetimecovert(vehicles['_items'][index]['disconnectTime']);
      temp['DoneChargingTime'] = datetimecovert(vehicles['_items'][index]['doneChargingTime']);
      temp['KWHDelivered'] = vehicles['_items'][index]['kWhDelivered'];
      temp['PointID'] = 1 + Math.floor(Math.random() * 687);
      temp['EnergyPriceID'] = 1 + Math.floor(Math.random() * 24);
      temp['VehicleID'] = 1 + Math.floor(Math.random() * 199);
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
      csvData.push(temp)
    }
    sql.end();

    //console.log(csvData);


});
