import React from 'react';
import {Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const PublicLayout = () => {
    return (
        <div className='PublicLayout'>
             <Header/>
            <Outlet/>
          
        </div>
    );
};

export default PublicLayout;