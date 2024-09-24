import React from "react";
import { Route, Routes } from "react-router-dom";

import { AddArticle, DeleteArticle, UpdateArticle, GetArticle, GetArticles } from "./index";
import BlogLayout from "./BlogLayout";

import AuthGuard from "../../_helpers/AuthGuard";
import Error from "../../_utils/Error";

const ArticlesRouter = () => {
  return (
    <Routes>
      <Route element={<BlogLayout />}>
        {/* Routes non protégées */}
        <Route index element={<GetArticles />} />
        <Route path="articles" element={<GetArticles />} />
        <Route path="articles/:id" element={<GetArticle />} />

        {/* Routes protégées avec AuthGuard pour chaque route */}
        <Route
          path="articles/add"
          element={<AuthGuard><AddArticle /></AuthGuard>} // Protège la route d'ajout d'article
        />
        <Route
          path="articles/update/:id"
          element={<AuthGuard><UpdateArticle /></AuthGuard>} // Protège la route de mise à jour d'article
        />
        <Route
          path="articles/delete/:id"
          element={<AuthGuard><DeleteArticle /></AuthGuard>} // Protège la route de suppression d'article
        />

        {/* Route pour les erreurs */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default ArticlesRouter;
