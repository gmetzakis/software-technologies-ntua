import axios from 'axios'
var fs = require('fs')
var querystring = require('querystring')

export async function Admin_UserStatus(args, token){

    if (typeof args._[1] != 'undefined'){
        console.log('You used extra parameters')
        return
    }
    //console.log(typeof args.users)

    if (typeof args.users === 'boolean' || typeof args.users === 'undefined'
        || typeof args.users === 'number'){
            console.log('You have to set parameter --users')
            return
        }
    
    var url = 'http://localhost:8765/evcharge/api/admin/users/'
    url = url + args.users
    var header = {'x-observatory-auth' : token,
    'Content-Type' : 'application/x-www-form-urlencoded'}

    function request(url){
        axios.get(url, {headers : header})
        .then((response => {
            console.log(response.data.user)
            console.log('Reminder : Your (currently logged in admin) Apikey is shown below:')
            console.log('')
            console.log(token)
            console.log('')
        }))
        .catch((error)=>{
            console.log("Error", error.response.status)
            console.log(error.response.data.message)
        })
    }
    request(url)
    return
}