import { AddUser, DeleteUser, UpdateUser, GetUser, GetUsers } from "./index";
import UserLayout from "./UserLayout";
import AuthGuard from "../../../_helpers/AuthGuard"; 
import Error from "../../../_utils/Error";
import { Route, Routes } from "react-router-dom";

const UserRouter = () => {
  return (
    <Routes>
      {/* Layout global */}
      <Route element={<UserLayout />}>
        
        {/* Route publique */}
        <Route path="users/add" element={<AddUser />} />

        {/* Routes protégées avec AuthGuard */}
        <Route
          path="users"
          element={<AuthGuard> <GetUsers /> </AuthGuard>} // Correction ici : AuthGuard protège GetUsers
        />
        <Route
          path="users/:id"
          element={<AuthGuard> <GetUser /> </AuthGuard>}  // Correction ici : AuthGuard protège GetUser
        />
        <Route
          path="users/update/:id"
          element={<AuthGuard> <UpdateUser /> </AuthGuard>}  // Correction ici : AuthGuard protège UpdateUser
        />
        <Route
          path="user/delete/:id"
          element={<AuthGuard> <DeleteUser /> </AuthGuard>}  // Correction ici : AuthGuard protège DeleteUser
        />

        {/* Route pour les erreurs */}
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default UserRouter;
