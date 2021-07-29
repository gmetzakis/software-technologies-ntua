// Define constants

const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 8765;


const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const redis = require('redis');
const fs = require('fs')
//const https = require('https');
const http = require('http');
const RedisServer = require('redis-server');
//const initialize = require('./init.js');

// read certificates

const key = fs.readFileSync('./certificates/evchargeServer.key');
const cert = fs.readFileSync( './certificates/evchargeServer.crt');
// https server options

const options = {
key: key,
cert: cert
};


// MYSQL Database

const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Your Password HERE!',
    database: 'evcharge'
});

// connect to MYSQL
mc.connect();


mc.query("SELECT 1 FROM Users WHERE Username = ? LIMIT 1" , "admin" , function (erru,resu) {

    if (resu[0]) {
        console.log("Database already initialized !");
    }
    else {

        psswd = 'petrol4ever';

        let hash = bcrypt.hashSync(psswd, 10);
        query = " INSERT INTO Users (Username,Pswd,Admn,hashid) VALUES ('admin','"+hash+"',1,1)";
        mc.query(query, function (err1, res1) {
            if (err1) console.log("Something went wrong in adding the admin!" + err1);
            else {
              console.log("Database initialized succesfully!");
              /*
              mc.query(initialize(), function (err2, res2) {
                  if (err2) console.log("Something went wrong in initializing the database!" + err2);
                  else {
                      console.log("Database initialized succesfully!");
                  }
              });
              */
            }
        });
    }

});

// REDIS Database

// Simply pass the port that you want a Redis server to listen on.

const server = new RedisServer({
    //conf: './redis.conf',
    port: 6379,
    bin: "redis-server"    // change path if necessary - needs to show to redis-server
});
server.open((err) => {
  if (err === null) {
    // You may now connect a client to the Redis
    // server bound to port 6379.
    console.log("Redis Server started");
  }
});

var client = redis.createClient();

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function(err){
    console.log('Something went wrong ', err)
});

client.get('counter', function(error, result) {

    if (error) console.log(error);

    else {

        if(result==null) {

            client.set('counter',0, function(e1,r1) {

                if(e1) console.log(e1);
                client.quit(redis.print);
            });
        }

        else {
            console.log('Counter is ->', result)
            client.quit(redis.print);
        }
    }
});


//const myserver = app.listen(port);

http.createServer (app).listen(port);

//https.createServer(options, app).listen(port);

console.log('API server started on: ' + port);

app.use(cors());
app.options('*', cors());

app.use(bodyParser.text({defaultCharset: 'utf-8'}));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));


var routes = require('./app/routes/appRoutes.js'); //importing route
routes(app); //register the route


module.exports = {
    app,
    mc
}
