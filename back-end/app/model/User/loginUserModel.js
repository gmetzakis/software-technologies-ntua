'user strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sql = require('../db.js');
const redis = require('redis');

login = function(username, pswd, result){
  var query = "SELECT Pswd,ID,Admn FROM Users WHERE Username ='"+username+"' LIMIT 1 ;";
  sql.query(query, function(err, res){
    if(!res[0]){
      result(true, {"success":false, "message":"Invalid username given!"});
    }
    else{
      //check if the hash produces the same output for the given and the initial pswd
      if(bcrypt.compareSync(pswd, res[0].Pswd)){
        //if yes the user has successfully logged in
        console.log("User "+ username + " successfully logged in!");
        //open a client to validate a new jwt token in redis
        var client = redis.createClient();
        client.on('error', function(err1){
          console.log('Something went wrong: ', err1)
        });

        client.incr('counter', function(err2, res2){
          if(err2){
            console.log("An error occured: ", err2);
          }
          counter = res2;
          console.log("Counter is now "+counter+" !");
          client.quit(redis.print);
          const body = {_id :res[0].ID,jwtid:counter,admn:res[0].Admn};
          const token = jwt.sign({user : body},'top_secret',{expiresIn: '2h'});
          result(null,{'success': true,'message':"User "+ username +" succesfully logged in !",'token':token});

        });
      }
      else{
        result(null,{'success':false,'message':"The password is invalid!"});
      }
    }
  })
}

module.exports = login;
