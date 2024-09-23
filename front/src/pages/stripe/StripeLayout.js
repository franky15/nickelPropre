import React from 'react';
import {Outlet } from 'react-router-dom';
import Header from '../../components/Header';


const StripeLayout = () => {
    return (
        <div className='StripeLayout'>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default StripeLayout;