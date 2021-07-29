'user strict';

const sql = require('../db.js')

get_Health_Check = function(result){
  var query = "SELECT * FROM Users LIMIT 1";
  sql.query(query, function(err, res){
    if(err){
      console.log("error ", err);
      result(true, {'success':false,'message':'Something went wrong!'});
    }
    else{
      if(!res[0]){
        result(null, {'success':false, 'message':'Database is not properly initialized!'});
      }
      else{
        result(null, {'success':true, 'status':'OK'});
      }
    }
  })
}

module.exports = get_Health_Check;
