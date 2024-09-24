import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { accountServices } from '../_services.js/Account.services';
import {jwtDecode} from 'jwt-decode';

const AuthGuard = ({ children }) => {
    console.log("**** Bienvenue dans AuthGuard");

    const navigate = useNavigate();
    const location = useLocation();  // Ajout de useLocation pour suivre les changements d'URL
    const userStore = useSelector((state) => state.auth); //auth est le nom du reducer de la page auth

    useEffect(() => {
        console.log("***userStore dans AuthGuard", userStore);

        // Vérification si l'utilisateur est connecté
        if (!accountServices.isLogged()) {
            console.log("**** Vous n'êtes pas connecté");
            navigate('/auth/login');
        } else {
            const token = accountServices.getToken();  // Récupération du token

            if (token) {
                try {
                    const decodedToken = jwtDecode(token);  // Décodage du token
                    console.log("****decodedToken dans Authguard", decodedToken);
                    
                    if (decodedToken.exp < Date.now() / 1000) {  //si le token est expiré
                        console.log("**** Le token est expiré");
                        accountServices.logout();
                        navigate("/auth/login");
                    } else {
                        // Stockage du userId dans le localStorage en fonction du rôle
                        if (decodedToken.role === "Admin") {
                            console.log("**** Vous êtes admin");
                            localStorage.setItem("userId", JSON.stringify(decodedToken.userId)); // Correction ici
                            //navigate("/");
                        } else if (decodedToken.role === "User") {
                            console.log("**** Vous êtes un utilisateur");
                            localStorage.setItem("userId", JSON.stringify(decodedToken.userId)); // Correction ici
                            //navigate("/");
                        } else if (decodedToken.role === "Prestataire") {
                            console.log("**** Vous êtes prestataire");
                            localStorage.setItem("userId", JSON.stringify(decodedToken.userId)); // Correction ici
                            //navigate("/");
                        }
                    }
                } catch (error) {
                    console.error('Erreur lors du décodage du token :', error);
                    accountServices.logout();
                }
            }
        }
    }, [userStore.token, location.pathname]);  // Ajout de location.pathname dans les dépendances

    if (!accountServices.isLogged()) { 
        return <navigate to="/auth/login" />;
    }

    return children;
};

export default AuthGuard;
