'user strict';

const sql = require('../db.js');

get_Sessions_Station = function (ID,year_from,month_from,day_from,year_to,month_to,day_to,req_timestamp,result){

  var data;

  var q1 = "SELECT s.PointID, COUNT(s.ID) as PointSessions, SUM(s.KWHDelivered) as EnergyDelivered "
  var q2 = "FROM Sessions s JOIN Points p ON s.PointID = p.ID "
  var q3 = "JOIN Stations st ON p.StationID = st.ID "
  var q4 = "WHERE p.StationID = '"+ID+"' AND s.ConnectionTime >= '"+year_from+"-"+month_from+"-"+day_from+"' "
  var q5 = "AND s.DoneChargingTime <= '"+year_to+"-"+month_to+"-"+day_to+"'; "
  var q6 = "AND s.DoneChargingTime <= '"+year_to+"-"+month_to+"-"+day_to+"' GROUP BY s.PointID; "
  var q7 = "SELECT st.OperatorID as Operator, SUM(s.KWHDelivered) as TotalEnergyDelivered, COUNT(*) as NumberOfChargingSessions, COUNT(DISTINCT s.PointID) as NumberOfActivePoints "

  var final = q7+q2+q3+q4+q5;
  var final2 = q1+q2+q4+q6;

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
              datalst = JSON.stringify(res2);
              datalst = JSON.parse(datalst);

              res[0].StationID = ID
              res[0].PeriodFrom = year_from+"-"+month_from+"-"+day_from
              res[0].PeriodTo = year_to+"-"+month_to+"-"+day_to
              res[0].SessionsSummaryList = datalst;
              res[0].RequestTimestamp = req_timestamp;

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

module.exports = get_Sessions_Station;
