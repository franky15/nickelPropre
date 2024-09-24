import React from 'react';
import {Outlet } from 'react-router-dom';

import Header from '../../../components/Header';

const ServiceLayout = () => {
    return (
        <div className='ServiceLayout'>
             <Header/>
            <Outlet/>
          
        </div>
    );
};

export default ServiceLayout;