import React from 'react';
import {Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const BlogLayout = () => {
    return (
        <div className='BlogLayout'>
             <Header/>
            <Outlet/>
          
        </div>
    );
};

export default BlogLayout;