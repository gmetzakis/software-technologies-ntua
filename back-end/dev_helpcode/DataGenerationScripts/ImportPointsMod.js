const sql = require('./db.js');

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const filepath = '../charging_points_europe_csv/points_big.csv'

var query = "INSERT INTO Points SET ?"
//var temphed = ['ID', 'Title', 'IsOperational', 'IsUserSelectable']
var csvData = []

fs.createReadStream(filepath)
    .on('error', () => {
        // handle error
    })

    .pipe(csv({separator:','}))
    .on('headers', (headers) => {
      //console.log(`First header: ${headers[1].slice(0,5)}`)
      console.log(headers)
    })
    .on('data', (data) => {
      //data['IsOperational'] = (data['IsOperational']==='True');
      //data['IsUserSelectable'] = (data['IsUserSelectable']==='True');
      tmp = {}
      tmp['UUID'] = data['UUID']
      tmp['StationID'] = 1 + Math.floor(Math.random() * 28);
      sql.query(query,tmp, (error, response) => {
              console.log(error || response);
            });
      console.log(data);
      //csvData.push(data);
      //console.log(data['OperatorInfo.ID']);
        //console.log(row['EntityCreatedAt'].slice(0,20));
    })
    .on('end', () => {
      console.log('done');
      sql.end();

      //console.log(csvData);
      /*
      for (var i = 0; i < csvData.length; i++) {
        sql.query(query,csvData[i], (error, response) => {
                console.log(error || response);
              });
      }*/
      /*sql.query(query,csvData, (error, response) => {
              console.log(error || response);
            })*/
        // handle end of CSV
    })
