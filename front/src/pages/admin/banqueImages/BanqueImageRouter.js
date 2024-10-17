import React from 'react';
import { Route, Routes } from "react-router-dom";

import { AddImage, DeleteImage, UpdateImage, GetImage, GetImages } from "./index";
import BanqueImagesLayout from "./BanqueImagesLayout";

import AuthGuard from "../../../_helpers/AuthGuard"; 
import Error from "../../../_utils/Error";


const BanqueImagesRouter = () => {
  return (
    <Routes>
      <Route element={<BanqueImagesLayout />}>
        {/* Ajoute un layout ou un composant pour banque */}
        <Route path="images/add" element={<AddImage />} />
        <Route path="images" element={<GetImages />} />
        <Route path="images/:id" element={<GetImage />} />
        <Route path="images/update/:id" element={<UpdateImage />} />
        <Route path="images/delete/:id" element={<DeleteImage />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default BanqueImagesRouter;


