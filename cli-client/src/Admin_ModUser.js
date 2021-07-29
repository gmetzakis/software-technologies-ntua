import axios from 'axios'
import { type } from 'os'
import { argv } from 'process'
var fs = require('fs')
var querystring = require('querystring')

export async function Admin_ModUser(args, token){

    if (typeof args._[1] != 'undefined'){
        console.log('You used extra parameters')
        return
    }

    if (typeof args.username === 'boolean' || typeof args.username === 'undefined' || typeof args.username === 'number'){
        console.log('You have to set parameter --username using at least one letter')
        return
    }

    if (typeof args.passw === 'boolean' || typeof args.passw === 'undefined'){
        console.log('You have to set parameter --passw')
        return
    }

    var url = 'http://localhost:8765/evcharge/api/admin/usermod/'
    url = url + args.username + '/' + args.passw

    var header = {'x-observatory-auth' : token,
                  'Content-Type' : 'application/x-www-form-urlencoded'}

    function request(url){
        axios.post(url, querystring.stringify({
            username: args.username,
            password: args.passw
        }),
        {headers : header})
        .then((response => {
            console.log(response.data.message)
            console.log('Reminder : Your (currently logged in admin) Apikey is shown below:')
            console.log('')
            console.log(token)
            console.log('')
        }))
        .catch((error) => {
            console.log("Error", error.response.status)
            console.log(error.response.data.message)
        })
    }
    request(url)
    return
}