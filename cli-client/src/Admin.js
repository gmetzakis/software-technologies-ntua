import minimist from 'minimist'
import { type } from 'os'
import { Admin_ModUser } from './Admin_ModUser'
import { Admin_UserStatus } from './Admin_UserStatus'
import { Admin_SessionUpdate } from './Admin_SessionUpdate'
import { HealthCheck } from './HealthCheck'
import { ResetSessions } from './ResetSessions'
var fs = require('fs')



export async function Admin(args){

    var token_path = './softeng20bAPI.token'
    
    
    function choose_command(args){

        fs.readFile(token_path, 'utf8',
        function callbacks(err, data){
            if (err){
                console.log('Error when trying to read the file')
                return
            }
            var token = data
            let myArray = process.argv.slice(3)
            let avail_scopes = ['--usermod', '--users', '--sessionsupd', '--healthcheck', '--resetsessions']
            const filteredArray = avail_scopes.filter(value => myArray.includes(value));
            let command = 'help'
            if (filteredArray.length > 1){
                console.log('---------You have to choose one of the following commands:---------')
                console.log('--usermod // --users // --sessionsupd // --healthcheck // --resetsessions')
                return
            }
            else{
                if ((typeof args.usermod === 'boolean') || (args.usermod)){
                    if (myArray.length > 5){
                        console.log('The correct syntax for --usermod is as shown below:')
                        console.log('--usermod --username Username --passw Password')
                        command = 'out'
                    }
                    else{
                    command = 'usermod'
                    }
                }
                if ((typeof args.users === 'boolean')||(args.users)){
                    if (myArray.length > 2){
                        console.log('The correct syntax for --users is as shown below:')
                        console.log('--users Username')
                        command = 'out'
                    }
                    else{
                    command = 'users'
                    }
                }
                if ((typeof args.sessionsupd === 'boolean')||(args.sessionsupd)){
                    if (myArray.length > 3){
                        console.log('The correct syntax for --sessionsupd is as shown below:')
                        console.log('--sessionsupd --source Filename')
                        command = 'out'
                    }
                    else{
                    command = 'sessionsupd'
                    }
                }
                if ((typeof args.healthcheck === 'boolean')||(args.healthcheck)){
                    if (myArray.length > 1){
                        console.log('Use --healthcheck without any more parameters or values')
                        command = 'out'
                    }
                    else{
                        command = 'healthcheck'
                    }
                }
                if ((typeof args.ressetsessions === 'boolean')||(args.ressetsessions)){
                    if (myArray.length > 1){
                        console.log('Use --ressetsessions without any more parameters or values')
                        command = 'out'
                    }
                    else{
                    command = 'ressetsessions'
                    }
                }
                switch (command){
                    case 'help':
                        console.log('If you are not logged in as an admin you will not be able to execute any of these commands')
                        console.log('If you are logged in as an admin or just a curious user you can see the commands below')
                        console.log('')
                        console.log('You have to choose one of the available commands:')
                        console.log('--usermod --username --passw')
                        console.log('--users')
                        console.log('--sessionsupd --source  => Dont use this :)')
                        console.log('--healthcheck')
                        console.log('--resetsessions')
                        break
                    
                    case 'usermod':
                        Admin_ModUser(args, token)
                        break
                    
                    case 'users':
                        Admin_UserStatus(args, token)
                        break
                    
                    case 'sessionsupd':
                        console.log('This functionality isnt implemented correctly so dont try using it')
                        //Admin_SessionUpdate(args,token)
                        break
                    
                    case 'healthcheck':
                        HealthCheck(args)
                        break
                    
                    case 'ressetsessions':
                        ResetSessions(args)
                        break
                    
                    case 'out':
                        break
                }
            }
        })
        
    }
    choose_command(args)
}