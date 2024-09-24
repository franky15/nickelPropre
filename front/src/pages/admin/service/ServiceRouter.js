import { AddService, DeleteService, UpdateService, GetService, GetServices } from "./index";
import ServiceLayout from "./ServiceLayout";
import AuthGuard from "../../../_helpers/AuthGuard"; 
import Error from "../../../_utils/Error";
import { Route, Routes } from "react-router-dom";

const ServiceRouter = () => {
  return (
    <Routes>
      {/* Layout global */}
      <Route element={<ServiceLayout />}>
        
        {/* Route publique */}
        <Route
          path="services"
          element={ <GetServices /> } 
        />
        <Route
          path="services/:id"
          element={<GetService /> }  
        />


        {/* Routes protégées avec AuthGuard */}
        <Route 
         path="services/add"
         element={<AuthGuard><AddService /></AuthGuard>} />
        <Route
          path="services/update/:id"
          element={<AuthGuard> <UpdateService /> </AuthGuard>}  
        />
        <Route
          path="services/delete/:id"
          element={<AuthGuard> <DeleteService /> </AuthGuard>}  
        />

        {/* Route pour les erreurs */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default ServiceRouter;
