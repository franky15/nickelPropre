import React from 'react';
import {Outlet } from 'react-router-dom';

import Header from '../../../components/Header';

const ChantierLayout = () => {
    return (
        <div className='ChantierLayout'>
             <Header/>
            <Outlet/>
          
        </div>
    );
};

export default ChantierLayout;