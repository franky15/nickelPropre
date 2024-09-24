import React from 'react';
import {Outlet } from 'react-router-dom';

import Header from '../../../components/Header';

const BanqueImagesLayout = () => {
    return (
        <div className='BanqueImagesLayout'>
             <Header/>
            <Outlet/>
          
        </div>
    );
};

export default BanqueImagesLayout;