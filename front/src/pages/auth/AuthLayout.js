import React from 'react';
import {Outlet } from 'react-router-dom';

import Header from '../../components/Header';

const AuthLayout = () => {
    return (
        <div className='AuthLayout'>
             <Header/>
            <Outlet/>
          
        </div>
    );
};

export default AuthLayout;