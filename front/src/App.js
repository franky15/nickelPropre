
import React from 'react'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PublicRouter from './pages/public/PublicRouter';
import ArticlesRouter from './pages/blog/ArticlesRouter';
import StripeRouter from './pages/stripe/StripeRouter';
import AuthRouter from './pages/auth/AuthRouter';
import UserRouter from './pages/admin/user/UserRouter';
import BanqueImagesRouter from './pages/admin/banqueImages/BanqueImageRouter';
import ChantierRouter from './pages/admin/chantier/ChantierRouter';
import ServiceRouter from './pages/admin/service/ServiceRouter';
import Dashboard from './pages/admin/Dashboard';


import AuthGuard from './_helpers/AuthGuard';

//importation des routes pour stripe
import Success from './pages/stripe/Success';
import Cancel from './pages/stripe/Cancel';

function App() {
  return (
    <BrowserRouter>
    <Routes>

     
     

      <Route path='/stripe/*' element={<StripeRouter/>} />

      <Route path='/auth/*' element={<AuthRouter/>} /> 
      <Route path='/admin/*' element={<UserRouter/>} />
      <Route path='/admin/services/*' element={<ServiceRouter/>} />
      
      <Route path='/admin/traveaux/*' element={
          <AuthGuard>
            <ChantierRouter />
          </AuthGuard>
        } />

      <Route path='/admin/banque/*' element={
          <AuthGuard>
            <BanqueImagesRouter />
          </AuthGuard>
        } />

      <Route path='/admin/dashboard' element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        } />
      
      <Route path='blog/*' element={<ArticlesRouter/>} />
    

      {/*sans layout juste avec  router */}
      <Route path='/*' element={<PublicRouter/>} />


    </Routes>
  </BrowserRouter>

  );
}

export default App;
