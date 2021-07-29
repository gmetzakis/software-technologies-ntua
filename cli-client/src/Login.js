import axios from 'axios'
import { error } from 'console'
import { type } from 'os'

var fs = require('fs')
var querystring = require('querystring')

export async function Login(args){

    let myArray = process.argv.slice(2)

    if (typeof args.username === 'boolean' || typeof args.username === 'undefined' || typeof args.username === 'number'){
        console.log('You have to set parameter --username using at least one letter')
        return
    }

    if (typeof args.passw === 'boolean' || typeof args.passw === 'undefined'){
        console.log('You have to set parameter --passw')
        return
    }

    if (myArray.length > 5){
        console.log('You used extra arguments. In order to log in follow the syntax shown below:')
        console.log('login --username Username --passw Password')
        return
    }

    if (typeof args._[1] != 'undefined'){
        console.log('You used extra parameters')
        return
    } 

    var url = 'http://localhost:8765/evcharge/api/login'
    var token_path = './softeng20bAPI.token'

    function request(url, path){

        axios.post(url, querystring.stringify({
                        username : args.username,
                        password : args.passw
        }),
        {headers : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }})
        .then ((response => {
            console.log(response.data.message)
            console.log('')
            console.log("{\"token\":",response.data.token,"}")
            fs.writeFile(token_path, response.data.token, (err) => {
                if (err){
                    console.log('Cant write in the file')
                }
            })
        }))
        .catch((error) => {
            console.log("Error", error.response.status)
            console.log(error.response.data.message)
        })
    }

    request(url, token_path)
}