
import React from 'react'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PublicRouter from './pages/public/PublicRouter';
import ArticlesRouter from './pages/blog/ArticlesRouter';

function App() {
  return (
    <BrowserRouter>
    <Routes>

      {/*sans layout juste avec  router */}
      <Route path='/*' element={<PublicRouter/>} />
      <Route path='blog/*' element={<ArticlesRouter/>} />

    </Routes>
  </BrowserRouter>

  );
}

export default App;
