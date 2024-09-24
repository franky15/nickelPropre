import React from 'react';
import {  Route, Routes } from 'react-router-dom';

import AuthLayout from './AuthLayout';
import Login from './Login';
import Error from '../../_utils/Error';

const AuthRouter = () => {
    return (
        <Routes>
            <Route element={<AuthLayout/>}>
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element= { <Error/> }/>
            </Route>
        </Routes>
    );
};

export default AuthRouter;