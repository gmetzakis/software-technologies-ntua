import axios from 'axios'
import { type } from 'os'
import { argv } from 'process'
var fs = require('fs')
var querystring = require('querystring')
var FormData = require('form-data');

export async function Admin_SessionUpdate(args, token){

    let myArray = process.argv.slice(3)

    if (typeof args._[1] != 'undefined'){
        console.log('You used extra parameters')
        return
    }

    if (typeof args.source === 'boolean' || typeof args.source === 'undefined'){
        console.log('You have to set parameter --source')
        return
    }

    var url = 'http://localhost:8765/evcharge/api/admin/sessionsupd/'
    //url = url + args.username + '/' + args.passw

    var header = {'x-observatory-auth' : token,
                  'Content-Type' : 'multipart/form-data'} 

    var filename = __dirname + '/' + args.source
    console.log(filename) 
    var newfile = fs.createReadStream(filename)
    const form_data = new FormData()
    form_data.append("file", newfile)
    
    function request(url){
        axios.post(url,   //add stuff here
        {headers : header})
        .then((response => {
            console.log(response.data.message)
        }))
        .catch((error) => {
            console.log("Error", error.response.status)
            console.log(error.response.data.message)
        })
    }
    request(url)
    return
}