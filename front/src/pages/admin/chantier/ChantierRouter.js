import { AddChantier, DeleteChantier, UpdateChantier, GetChantier, GetChantiers } from "./index";
import ChantierLayout from "./ChantierLayout";

import Error from "../../../_utils/Error";
import { Route, Routes } from "react-router-dom";

const ChantierRouter = () => {
  return (
    <Routes>
      <Route element={<ChantierLayout />}>
        {/* Ajoute un layout ou un composant pour banque */}
        <Route path="chantiers/add" element={<AddChantier />} />
        <Route path="chantiers" element={<GetChantiers />} />
        <Route path="chantiers/:id" element={<GetChantier />} />
        <Route path="chantiers/update/:id" element={<UpdateChantier />} />
        <Route path="chantiers/delete/:id" element={<DeleteChantier />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default ChantierRouter;


