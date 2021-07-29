'user strict';

const jwt = require('jsonwebtoken');
const config = 'top_secret';
const redis = require('redis');

authenticate = function(req,result) {
  let token = req.headers['x-observatory-auth'];
  if(token){
    if(token.startsWith('Bearer ')){
      token = token.slice(7, token.length);
    }
    jwt.verify(token, config, (err, decoded) => {
      if(err){
        result(true, false, null, null);
      }
      else{
        var client = redis.createClient();
        client.get('blacklist:'+decoded.user.jwtid, function(err1, res1){
          if(err1 || res1!=null){
            client.quit(redis.print);
            result(null, false, null, null);
          }
          else{
            client.quit(redis.print);
            result(null,true,decoded.user._id,decoded.user.admn);
          }
        });
      }
    });
  }
  else {
    result(true, null, null, null);
  }
};

module.exports = authenticate;
