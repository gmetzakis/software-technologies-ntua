'use strict';

var modifyusr = require('../../model/User/modifyUserModel.js');
var authenticate = require('../../auth/auth.js')

exports.modify_a_user = function(req, res)
{
  if(!((req.params.username)&&(req.params.password))){
    res.status(400).json({"success":false,"message":"One or more mandatory fileds are missing."});
  }
  /*
  else if((req.params.username.length > 255)||(req.params.password.length > 255)){
    res.status(400).json({"success":false,"message":"One or more fields are not valid !"});
  }
  */
  else{
    authenticate(req, function(err2, res2, usr2, per){
      if(err2){
        res.status(401).json({"success":false,"message":"Please provide a valid authentication token !"});
      }
      else if(per!=1){
        res.status(401).json({"success":false,"message":"User has no permission for that action!"})
      }
      else{
        console.log(req.params.username);
        console.log(req.params.password);

        modifyusr(req.params.username, req.params.password, function(err, usr){
          if(err){
            res.status(400).json(usr);
          }
          else{
            res.json(usr);
          }
        });
      }
    })
  }
}
