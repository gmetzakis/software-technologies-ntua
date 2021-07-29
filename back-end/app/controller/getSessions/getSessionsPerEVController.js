'use strict'

var getSessionsPerEV = require('../../model/getSessions/getSessionsPerEVModel.js');
var authenticate = require('../../auth/auth.js');

const checks = require("../utils.js");

exports.get_sessions_per_ev = function(req, res){
  var year_from;
  var month_from;
  var day_from;
  var year_to;
  var month_to;
  var day_to;

  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;

  if(!(req.params.vehicleID && req.params.date_from && req.params.date_to)){
    res.status(400).json({"success":false,"message":"One or more mandatory fileds are missing!"});
  }
  else if(req.params.vehicleID.length>255 || req.params.length > 255){
    res.status(400).json({"success":false,"message":"One or more fields are not valid!"});
  }
  else if(!(checks.checkDate(req.params.date_from)) || !(checks.checkDate(req.params.date_to))){
    res.status(400).json({"success":false,"message":"One or more fields are not valid!"});
  }
  else{
    authenticate(req, function(err2, res2, usr2, per){
      if(err2){
        res.status(401).json({"success":false,"message":"Please provide a valid authentication token!"})
      }
      else if(res2){
        year_from = Number(req.params.date_from.slice(0,4));
        month_from = Number(req.params.date_from.slice(4,6));
        day_from = Number(req.params.date_from.slice(6,8));

        year_to = Number(req.params.date_to.slice(0,4));
        month_to = Number(req.params.date_to.slice(4,6));
        day_to = Number(req.params.date_to.slice(6,8));

        getSessionsPerEV(req.params.vehicleID,year_from,month_from,day_from,year_to,month_to,day_to,dateTime,function(err3, res3){
          if(err3){
            res.status(400).json(res3);
          }
          else{
            if(res3.success==true){
              res.json(res3.data);
            }
            else{
              res.status(402).json(res3);
            }
          }
        })
      }
      else{
        res.status(401).json({"success":false,"message":"Please provide a valid authentication token!"});
      }
    })
  }
}
