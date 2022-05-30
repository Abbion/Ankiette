import React from 'react';
import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom';
import {ReactSession} from 'react-client-session';

import LoginView from './Views/LoginView';
import RegisterView from "./Views/RegisterView";
import HomeView from './Views/HomeView';
import RegisterSuccessfulView from './Views/RegisterSuccessfulView';
import AccountRecoveryView from './Views/AccountRecoveryView';
import AccountView from './Views/AccountView';
import NewFormView from "./Views/NewFormView";
import ChosenReportDetailsView from './Views/ChosenReportDetailsView';
import NavbarView from './Views/NavbarView';
import CreateFormView from './Views/CreateNewFormView';
import ReportsView from "./Views/ReportsView";

import FormComponent from "./Components/FormComponent";

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
                    <Route path='/*' element={<LoginView/>}/>
                    <Route exact path='/' element={<LoginView/>} />
                    <Route exact path='/login' element={<LoginView/>} />
                    <Route exact path='/register' element={<RegisterView/>} />
                    <Route exact path='/recover' element={<AccountRecoveryView/>} />

                    <Route exact path='/' element={<PrivateRoute/>}>
                        <Route path='/form/:formCode' element={<FormComponent/>}/>
                    </Route>

                    <Route exact path='/' element={<PrivateRoute/>}>
                        <Route exact path='/registerSuccess' element={<RegisterSuccessfulView/>} />
                    </Route>

                    <Route exact path='/' element={<PrivateRoute/>}>
                        <Route exact path='/home' element={<HomeView/>} />
                    </Route>

                    <Route exact path='/' element={<PrivateRoute/>}>
                        <Route exact path='/account' element={<AccountView/>} />
                    </Route>

                    <Route exact path='/' element={<PrivateRoute/>}>
                        <Route exact path='/newForm' element={<NewFormView/>}/>
                    </Route>

                    <Route exact path='/' element={<PrivateRoute/>}>
                        <Route exact path='/editForm/:formCode' element={<CreateFormView/>}/>
                    </Route>

                    <Route exact path='/' element={<PrivateRoute/>}>
                        <Route exact path='/reports/' element={<ReportsView/>}/>
                    </Route>

                    <Route exact path='/' element={<PrivateRoute/>}>
                        <Route exact path='/reports/:formCode' element={<ChosenReportDetailsView/>}/>
                    </Route>

                </Routes>
                
            </div>
        </BrowserRouter>
        
    )
}

export default App;
