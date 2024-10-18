import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Success, Cancel, Paiement } from './index';

import StripeLayout from './StripeLayout';
import Error from '../../_utils/Error';



const StripeRouter = () => {
    return (
        <Routes>
            <Route element={<StripeLayout/>}>

                <Route path='/success' element={<Success/>} />
                <Route path="/cancel" element={<Cancel />} />
                <Route path="/paiement/:id/:prix" element={<Paiement />} />


                <Route path='*' element= { <Error/> }/>
        </Route>
    </Routes>
    );
};

export default StripeRouter;