'user strict';

const sql = require('../db.js')

post_reset = function(result){
  queries = []
  q1 = "DELETE FROM  Sessions;";
  q2 = "DELETE FROM Users WHERE Username NOT IN ('admin');"
  queries.push(q1);
  queries.push(q2);


  for (var i = 0; i < queries.length; i++) {
    sql.query(queries[i], function(err,res){
      if(err){
        console.log("error: ",err);
        result(true,{"success":false,'message':'An error occured'});
      }
    })
  }

  result(null, {"success":true, "message":"Database initialized successfully!"});

}

module.exports = post_reset;
