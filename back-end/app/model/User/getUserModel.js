'user strict';

const sql = require('../db.js')

getusr = function (username, result){

  var final;
  final = "SELECT Username, Admn FROM Users WHERE Username= '"+username+"' LIMIT 1 ;";
  console.log(final);
  sql.query(final, function (err, res){
    if(err){
      console.log("error ", err);
      result(true, {'success':false,'message':'Something went wrong!'});
    }
    else{
      if(!res[0]){
        result(null, {'success':false, 'message':'Username is not in database!'});
      }
      else{
        result(null, {'success':true, 'user':res[0]});
      }
    }
  });
};

//get_pid(2,console.log);

module.exports = getusr;
