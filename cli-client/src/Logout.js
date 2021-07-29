import axios from 'axios'
var fs = require('fs')


export async function Logout(args){
    
    var url = 'http://localhost:8765/evcharge/api/logout'
    var token_path = './softeng20bAPI.token'
    
    let myArray = process.argv.slice(2)
    if (myArray.length > 1){
        console.log('In order to logout just type logout')
        return
    }
    
    function request(url, path){   
        fs.readFile(path, 'utf8',
        function post_request(err, data){
            if (err){
                console.log('Error when trying to read the file')
                return
            }
            var token = data
            data = {}
            axios.post(url, data,
            {headers : {
                'x-observatory-auth' : token,
                'Content-Type' : 'application/x-www-form-urlencoded'
            }})
            .then(response => {
                console.log("Status",response.status)
                console.log(response.data)
                fs.unlink(path, (err) => {
                    if (err){
                        console.error(err, 'Error while deleting the file')
                        return
                    }
                })
            })
            .catch((error) => {
                console.log("Error", error.response.status)
                console.log(error.response.data.message)
            })
        })
    }

    fs.access(token_path, fs.F_OK, (err) => {
        if (err){
            console.error('You need to log in first')
            return
        }
        request(url, token_path)
    })
    return
}
