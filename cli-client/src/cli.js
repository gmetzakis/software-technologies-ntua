import minimist from "minimist"
import { Help } from "./Help"
import { HealthCheck } from "./HealthCheck"
import { ResetSessions } from "./ResetSessions"
import { Login } from "./Login"
import { Logout } from "./Logout"
import { SessionsPerPoint } from "./SessionsPerPoint"
import { SessionsPerEV } from "./SessionsPerEV"
import { SessionsPerProvider } from "./SessionsPerProvider"
import { SessionsPerStation } from "./SessionsPerStation"
import { Admin } from "./Admin"

export async function cli(argsArray){

    const args = minimist(argsArray.slice(2));
    let command = args._[0];
  
    switch(command){

        case('help'):
            Help(args)
            break

        case('healthcheck'):
            HealthCheck(args)
            break

        case('resetsessions'):
            ResetSessions(args)
            break

        case('login'):
            Login(args)
            break
        
        case('logout'):
            Logout(args)
            break

        case('SessionsPerPoint'):
            SessionsPerPoint(args)
            break
        
        case('SessionsPerEV'):
            SessionsPerEV(args)
            break

        case('SessionsPerProvider'):
            SessionsPerProvider(args)
            break

        case('SessionsPerStation'):
            SessionsPerStation(args)
            break

        case('Admin'):
            Admin(args)
            break

        default:
            console.error(`Error : "${command}" is not a valid command!`)
            break
    }
}