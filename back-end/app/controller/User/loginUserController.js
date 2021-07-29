'use strict';

var login = require('../../model/User/loginUserModel.js')

exports.login_as_user = function(req, res){
  if(!(req.body.password && req.body.username)){
    res.status(400).json({"success":false,"message":"One or more mandatory fields missing!"})
  }
  else if(req.body.username.length > 255){
    res.status(400).json({"success":false,"message":"Username is not valid!"})
  }
  else if(typeof req.body.username!='string' || typeof req.body.password!='string'){
    res.status(400).json({"success":false,"message":"One or more fields is not valid!"})
  }
  else {
    login(req.body.username, req.body.password, function(err,usr){
      if(err){
        res.status(404).json(usr);
      }
      else{
        if(usr.success==true){
          res.json(usr);
        }
        else{
          res.status(403).json(usr);
        }
      }
    })
  }
}
