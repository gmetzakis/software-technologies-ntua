'use strict'

var health = require('../../model/Help/getHealthCheck.js');

exports.health_check = function(req,res){
  health(function(err,res1){
    if(err){
      res.status(400).json(err);
    }
    else{
      res.json(res1);
    }
  })
}
