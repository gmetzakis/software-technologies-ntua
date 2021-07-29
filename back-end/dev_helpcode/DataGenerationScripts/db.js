'user strict';

var mysql = require('mysql');

//local mysql db connection

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Pr4sl6691',
	database : 'evcharge'
});

connection.connect(function(err) {
    	if (err) throw err;
      console.log("Connected!");
});

module.exports = connection;
