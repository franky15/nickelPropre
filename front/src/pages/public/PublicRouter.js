
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Home, Contact, About, Services} from './index';


import PublicLayout from './PublicLayout';
import Error from "../../_utils/Error";

const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/services" element={<Services/>}/>

                <Route path='*' element= { <Error/> }/>
            </Route>
        </Routes>
    );
};

export default PublicRouter;
