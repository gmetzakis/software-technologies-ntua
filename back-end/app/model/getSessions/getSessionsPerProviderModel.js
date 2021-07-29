'user strict';

const sql = require('../db.js');

get_Sessions_Provider = function (ID,year_from,month_from,day_from,year_to,month_to,day_to,result){

  var data;

  var q1 = "SELECT p.ID as ProviderID, p.Title as ProviderName, st.ID as StationID, s.ID as SessionID, s.VehicleID as VehicleID, s.ConnectionTime as StartedOn, s.DoneChargingTime as FinishedOn, ";
  var q2 = "s.KWHDelivered as EnergyDelivered, e.ID as PricePolicyRef, e.CostPerKWH as CostPerKWh, e.CostPerKWH * s.KWHDelivered as TotalCost ";
  var q3 = "FROM Sessions s JOIN EnergyPrices e on s.EnergyPriceID = e.ID ";
  var q4 = "JOIN EnergyProviders p on e.EnergyProviderID = p.ID JOIN Points po ON s.PointID = po.ID ";
  var q5 = "JOIN Stations st ON po.StationID = st.ID ";
  var q6 = "WHERE p.ID = '"+ID+"' AND s.ConnectionTime >= '"+year_from+"-"+month_from+"-"+day_from+"' ";
  var q7 = "AND s.DoneChargingTime <= '"+year_to+"-"+month_to+"-"+day_to+"' ";

  var final = q1+q2+q3+q4+q5+q6+q7;

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
        //console.log(JSON.stringify(res));
        data = JSON.stringify(res);
        data = JSON.parse(data);
        //console.log(data);
        result(null,{"success":true,"message":"Data fetched successfully", "data":data});
      }
    }
  })
};

module.exports = get_Sessions_Provider;
