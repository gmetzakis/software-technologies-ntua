'user strict';

const sql = require('../db.js');

get_Sessions_Point = function (ID,year_from,month_from,day_from,year_to,month_to,day_to,req_timestamp,result){

  var data;

  var q1 = "SELECT s.ID as SessionID, s.ConnectionTime as StartedOn, s.DoneChargingTime as FinishedOn, "
  var q2 = "s.KWHDelivered as EnergyDelivered, vt.Type as VehicleType "
  var q3 = "FROM Sessions s JOIN ElectricVehicle v ON s.VehicleID = v.ID JOIN ElectricVehicleType vt ON v.EVTypeID = vt.ID "
  var q4 = "FROM Stations st JOIN Points p ON st.ID = p.StationID JOIN Sessions s ON p.ID = s.PointID "
  var q5 = "WHERE s.PointID = '"+ID+"' AND s.ConnectionTime >= '"+year_from+"-"+month_from+"-"+day_from+"' "
  var q6 = "AND s.DoneChargingTime <= '"+year_to+"-"+month_to+"-"+day_to+"'; "
  var q7 = "SELECT DISTINCT(st.OperatorID) as PointOperator, COUNT(*) as NumberOfChargingSessions "

  var final = q7+q4+q5+q6;
  var final2 = q1+q2+q3+q5+q6;

  sql.query(final, function(err,res){
    if(err){
      console.log("error: ",err);
      result(true,{"success":false,"message":"Something went wrong,please try again later !"});
    }
    else{
      if(!res[0]){
        result(null,{"success":false,"message":"There are no data with these parameters!"})
      }
      else{
        sql.query(final2, function(err2,res2){
          if(err2){
            console.log("error: ",err2);
            result(true,{"success":false,"message":"Something went wrong,please try again later !"});
          }
          else{
            if(!res2[0]){
              result(null,{"success":false,"message":"There are no data with these parameters!"})
            }
            else{
              for (var i = 0; i < res2.length; i++) {
                res2[i].SessionIndex = i
                res2[i].Payment = "Card";
                res2[i].Protocol = "A good one LOL!";
              }

              datalst = JSON.stringify(res2);
              datalst = JSON.parse(datalst);

              res[0].Point = ID;
              res[0].PeriodFrom = year_from+"-"+month_from+"-"+day_from
              res[0].PeriodTo = year_to+"-"+month_to+"-"+day_to
              res[0].RequestTimestamp = req_timestamp;
              res[0].ChargingSessionsList = datalst;

              data = JSON.stringify(res);
              data = JSON.parse(data);

              //data['VehicleChargingSessionsList'] = datalst
              result(null,{"success":true,"message":"Data fetched successfully", "data":data});
            }
          }
        });
      }
    }
  });
}

module.exports = get_Sessions_Point;
