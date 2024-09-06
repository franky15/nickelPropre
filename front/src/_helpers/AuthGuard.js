//fermeture du mini router <AdminRouter/> permet l'authentification

import { Navigate } from "react-router-dom";
//import { accountServices } from "./_services/Account.services";  //"@/_services/Account.services";
import { accountServices } from "../_services/Account.services";


//import React from 'react';

const AuthGuard = ({ children }) => { //children car il aura des enfants quand on va le mettre dans le router

    //let isLogged = false;
    
    if(!accountServices.isLogged){ //si false (pas de token) alors on est toujours redirigé vers la même page de connexion
        return <Navigate to="/auth/login"/> //navigate parmet une redirection vers une route
    }

    return children  //ici on retourne le mini router <AdminRouter/> car il est l'enfant de <AuthGuard>
};

export default AuthGuard;

/*
Notez bien on utilise { children } quand on veut qu'un composant encapsule d'autres composant
en gros composants enfants différent des routes qui encapsuleent d'autres routes
*/