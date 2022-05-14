import React from 'react';
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import {ReactSession} from 'react-client-session';

import LoginView from './Views/LoginView';
import RegisterView from "./Views/RegisterView";
import HomeView from './Views/HomeView';
import RegisterSuccessfulView from './Views/RegisterSuccessfulView';
import AccountRecoveryView from './Views/AccountRecoveryView';
import UserProfileComponent from "./Components/UserProfileComponent";


const PrivateRoute = () => {
    const isAuthenticated = ReactSession.get("isAuthenticated");
    return (isAuthenticated) ? <Outlet/> : <Navigate to={"/login"} />;
}

function App() {
    ReactSession.setStoreType('localStorage');
    console.log(ReactSession.get("isAuthenticated"));

    return (
        <BrowserRouter>
            <div className="App" style={{margin: 0}}>
                <Routes>
                    <Route exact path='/' element={<LoginView/>} />
                    <Route exact path='/login' element={<LoginView/>} />
                    <Route exact path='/register' element={<RegisterView/>} />
                    <Route exact path='/recover' element={<AccountRecoveryView/>} />

                    <Route exact path='/' element={<PrivateRoute/>}>
                        <Route exact path='/registerSuccess' element={<RegisterSuccessfulView/>} />
                    </Route>
                    <Route exact path='/' element={<PrivateRoute/>}>
                        <Route exact path='/home' element={<HomeView/>} />
                    </Route>

                    <Route exact path='/' element={<PrivateRoute/>}>
                        <Route exact path='/account' element={<UserProfileComponent/>} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
