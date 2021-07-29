const sql = require('./db.js');

const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const filepath = '../charging_points_europe_csv/points_medium.csv'

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
      tmp['ID'] = data['ID']
      tmp['UUID'] = data['UUID']
      tmp['ParentChargePointID'] = data['ParentChargePointID']
      if(tmp['ParentChargePointID']==='null'){
        tmp['ParentChargePointID']=null;
      }
      tmp['DataProviderID'] = data['DataProviderID']
      tmp['OperatorID'] = data['OperatorID']
      tmp['UsageTypeID'] = data['UsageTypeID']
      tmp['UsageCost'] = data['UsageCost']
      if (tmp['UsageCost'] === 'false'){
        tmp['UsageCost'] = 0.0;
      }
      if (tmp['UsageCost'] === 'Free'){
        tmp['UsageCost'] = 0.0;
      }
      tmp['AddressInfoID'] = data['AddressInfo.ID']
      tmp['NumberOfPoints'] = data['NumberOfPoints']
      tmp['GeneralComments'] = data['GeneralComments']
      tmp['StatusTypeID'] = data['StatusType.ID']
      tmp['SubmissionStatusID'] = data['SubmissionStatus.ID']
      for(i in tmp){
        if(tmp[i]==='null' ||tmp[i]==='' ){
          tmp[i] = null;
        }
      }
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
