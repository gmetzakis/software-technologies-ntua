'user strict';

const sql = require('../db.js');

get_Sessions_EV = function (ID,year_from,month_from,day_from,year_to,month_to,day_to,req_timestamp,result){

  var data;

  var q1 = "SELECT s.ID as SessionID, p.Title as EnergyProvider, s.ConnectionTime as StartedOn, s.DoneChargingTime as FinishedOn, s.KWHDelivered as EnergyDelivered, "
  var q2 = "e.ID as PricePolicyRef, e.CostPerKWH as CostPerKWh, (e.CostPerKWH * s.KWHDelivered) as SessionCost "
  var q3 = "FROM Sessions s JOIN ElectricVehicle v ON s.VehicleID = v.ID "
  var q4 = "JOIN EnergyPrices e on s.EnergyPriceID = e.ID JOIN EnergyProviders p on e.EnergyProviderID = p.ID  "
  var q6 = "WHERE v.ID = '"+ID+"' AND s.ConnectionTime >= '"+year_from+"-"+month_from+"-"+day_from+"' "
  var q7 = "AND s.DoneChargingTime <= '"+year_to+"-"+month_to+"-"+day_to+"'; "
  var q8 = "SELECT COUNT(*) as NumberOfVehicleChargingSessions, SUM(s.KWHDelivered) as TotalEnergyConsumed, COUNT(DISTINCT s.PointID) as NumberOfVisitedPoints "

  var final = q8+q3+q4+q6+q7;
  var final2 = q1+q2+q3+q4+q6+q7;

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
                res2[i].SessionIndex = i;
              }
              datalst = JSON.stringify(res2);
              datalst = JSON.parse(datalst);

              res[0].VehicleID = ID;
              res[0].PeriodFrom = year_from+"-"+month_from+"-"+day_from
              res[0].PeriodTo = year_to+"-"+month_to+"-"+day_to
              res[0].RequestTimestamp = req_timestamp;


              res[0].VehicleChargingSessionsList = datalst;

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

module.exports = get_Sessions_EV;
