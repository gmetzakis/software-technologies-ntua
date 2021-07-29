'user strict'

const jwt = require('jsonwebtoken');
const logout = require('../../model/User/logoutUserModel.js');

exports.logout_user = function(req, res){
  let token = req.headers['x-observatory-auth'];
  if(token){
    if(token.startsWith('Bearer ')){
      token = token.slice(7, token.length);
    }
    jwt.verify(token, 'top_secret', (err, decoded) => {
      if(err){
        res.status(401).json({"success":false, "message":"Authentication failed!"});
      }
      else{
        logout(decoded, token, function(err2,res2){
          if(err2){
            res.status(400).json(res2);
          }
          else{
            res.status(200).json(res2);
          }
        })
      }
    })
  }
  else{
    res.status(401).json({"success":false, "message":"Please provide a valid authentication token!"});
  }
};
