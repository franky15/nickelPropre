
import React from 'react'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PublicRouter from './pages/public/PublicRouter';
import ArticlesRouter from './pages/blog/ArticlesRouter';
import StripeRouter from './pages/stripe/StripeRouter';

//importation des routes pour stripe
import Success from './pages/stripe/Success';
import Cancel from './pages/stripe/Cancel';

function App() {
  return (
    <BrowserRouter>
    <Routes>

     
      {/*routes pour stripe
      <Route path='/stripe/success' element={<Success/>} />
      <Route path="/cancel" element={<Cancel />} /> 
      */}
      <Route path='/stripe/*' element={<StripeRouter/>} />
      
      {/*sans layout juste avec  router */}
      <Route path='/*' element={<PublicRouter/>} />
      <Route path='blog/*' element={<ArticlesRouter/>} />

    </Routes>
  </BrowserRouter>

  );
}

export default App;
