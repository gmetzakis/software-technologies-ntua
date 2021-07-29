var fs = require('fs');
var moment = require('moment');

moment().format();

export async function Help(args){

    var token_path = './softeng20bAPI.token';
    fs.access(token_path, fs.F_OK, (err) => {  
        if (err){
            console.log("You are not logged in!")
            console.log("Choose one of the following scopes:")
            console.log("login --username --passw")
            console.log("healthcheck")
            console.log("resetsessions")
            return
        }
        console.log("Choose one of the following scopes:")
        console.log("SessionsPerPoint --point --datefrom --dateto --format")
        console.log("SessionsPerStation --station --datefrom --dateto --format")
        console.log("SessionsPerEV --ev --datefrom --dateto --format")
        console.log("SessionsPerProvider --provider --datefrom --dateto --format")
        console.log("healthcheck")
        console.log('resetsessions')
        console.log("logout")
        return
    })
}