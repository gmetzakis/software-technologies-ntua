import React from 'react';
import './App.css';
import Login from './components/Login';
import Sessions from './components/Sessions';
import SessionPerProviderTable from './components/SessionPerProviderTable';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AuthContext} from "./context/authentication";
import SessionsPerEV from "./components/SessionsPerEV";

function App() {

    const [authToken, setAuthToken] = React.useState();

    const setToken = (data) => {
        localStorage.setItem("access-token", JSON.stringify(data));
        setAuthToken(data);
    }

    return (
        <AuthContext.Provider value={{authToken, setAuthToken: setToken}}>
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Login}/>
                    <Route path='/sessions' exact={true} component={Sessions}/>
                    <Route path='/sessionsPerProvider/:providerId/:dateFrom/:dateTo' exact={true} component={SessionPerProviderTable}/>
                    <Route path='/sessionsPerEV/:vehicleId/:dateFrom/:dateTo' exact={true} component={SessionsPerEV}/>
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
