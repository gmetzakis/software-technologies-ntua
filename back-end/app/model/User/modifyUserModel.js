'user strict';

const bcrypt = require('bcryptjs');
const sql = require('../db.js');

modifyusr = function(username, password, result){
  var query = "SELECT ID, Username, Pswd FROM Users WHERE Username ='"+username+"' LIMIT 1 ;";
  sql.query(query, function(erru, resu){
    if(resu.length == 1){
      let newpass = bcrypt.hashSync(password, 10);
      final = "UPDATE Users SET Pswd = '"+ newpass +"' WHERE ID = '"+ resu[0].ID + "' ; ";
      sql.query(final, function(errm, resm){
        if(errm){
          console.log("error: ",errm);
          result(true, {"success":false, "message":errm});
        }
        else{
          result(null, {"success":true, "message":"Password has been successfully updated!"});
        }
      });
    }
    else{
      let hash = bcrypt.hashSync(password, 10);
      let hashid = Math.floor((Math.random()*10000000)+54);
      sql.query("INSERT INTO Users (Username, Pswd, Admn, Hashid) VALUES ('"+username+"','"+hash+"','"+0+"','"+hashid+"') ;", function(err, res){
        if(err){
          console.log('error: ', err);
          result(true, {'success':false, 'message': 'An error has occured!'});
        }
        else{
          console.log(res);
          console.log('Succesfully added new user with id --> ' + res.insertId);
          result(null, {"success": true, "message":"Welcome to the platform user "+username+" !"});
        }
      });
    }
  });
}

module.exports = modifyusr;
