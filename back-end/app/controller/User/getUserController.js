'use strict'

var getusr = require('../../model/User/getUserModel.js');
var authenticate = require('../../auth/auth.js');

exports.get_a_user = function(req, res){
  if(typeof req.params.username!='string'){
    res.status(400).json({"success":false,"message":"Please provide a valid username!"});
  }
  else{
    authenticate(req, function(err2,res2,usr2,per){
      if(err2){
        res.status(401).json({"success":false,"message":"Please provide a valid authentication token !"});
      }
      else if(per!=1){
        res.status(401).json({"success":false,"message":"User has no permission for this action!"});
      }
      else{
        getusr(req.params.username, function(err3, res3){
          if(err3){
            res.status(400).json(err3);
          }
          else if(res3.success==true){
            res.json(res3);
          }
          else {
            res.status(400).json(res3);
          }
        })
      }
    })
  }
}
