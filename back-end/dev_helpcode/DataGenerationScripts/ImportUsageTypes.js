const sql = require('./db.js');

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const filepath = '../charging_points_europe_csv/UsageTypes_data.csv'

var query = "INSERT INTO UsageTypes SET ?"
var temphed = ['ID', 'Title', 'IsPayAtLocation','IsMembershipRequired','IsAccessKeyRequired']
var csvData = []

fs.createReadStream(filepath)
    .on('error', () => {
        // handle error
    })

    .pipe(csv({separator:';', headers:temphed,skipLines:1}))
    .on('headers', (headers) => {
      //console.log(`First header: ${headers[1].slice(0,5)}`)
      console.log(headers)
    })
    .on('data', (data) => {
      data['IsPayAtLocation'] = (data['IsPayAtLocation']==='True');
      data['IsMembershipRequired'] = (data['IsMembershipRequired']==='True');
      data['IsAccessKeyRequired'] = (data['IsAccessKeyRequired']==='True');
      csvData.push(data);
      console.log(data);
        //console.log(row['EntityCreatedAt'].slice(0,20));
    })
    .on('end', () => {
      console.log('done');
      //console.log(csvData);
      for (var i = 0; i < csvData.length; i++) {
        sql.query(query,csvData[i], (error, response) => {
                console.log(error || response);
              });
      }
      sql.end();

      /*sql.query(query,csvData, (error, response) => {
              console.log(error || response);
            })*/
        // handle end of CSV
    })
