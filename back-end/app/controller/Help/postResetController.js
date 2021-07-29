'use strict'

var reset = require('../../model/Help/postResetSessionsModel.js');

exports.reset_database = function(req,res){
  reset(function(err,res1){
    if(err){
      res.status(400).json(err);
    }
    else{
      res.json(res1);
    }
  })
}
