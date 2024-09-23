import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { useNavigate } from 'react-router-dom';
import {jwtDecode }from "jwt-decode";


import { accountServices } from "../../_services.js/Account.services";

const initialState = {

    token: null,
    userTokenDecode: null, 
    status: null,
    error: null,
}


// Création d'une action asynchrone pour gérer la connexion de l'utilisateur
export const login = createAsyncThunk(

    'auth/login', // Nom de l'action
    async (loginObject, { rejectWithValue }) => { // Fonction asynchrone qui prend en paramètre les informations de connexion et un objet contenant une méthode rejectWithValue pour gérer les erreurs

     
       console.log("*** AuthSlice loginObject", loginObject)

        try {
            const response = await accountServices.login(loginObject);

            // Vérification si la réponse contient le token
            if (!response.data.token) {
                throw new Error('Token non reçu');
            }

            return response.data;

        } catch (error) {
            console.error('Erreur lors de la connexion:', error);

            // Utilisez rejectWithValue pour retourner une erreur personnalisée
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    
       

    }

);

// Création du slice pour gérer les actions et le state
const authSlice = createSlice({

    name: "auth", // Nom du slice
    initialState, //transmission du state initial en fonction de l'authentification
    
    reducers: {  // Définition des reducers des parties synchrones

        // Fonction pour déconnecter l'utilisateur
        logout: (state) => {

            accountServices.logout(); 

            state.token = null;
            state.userTokenDecode = null;
            state.status = null;
            state.error = null;
        },
    },


    extraReducers:(builder) => {    // Définition des reducers des parties asynchrones

        builder
            .addCase(login.fulfilled, (state, action) => { // Ajout d'un cas de succès pour l'action de connexion provenant de createAsyncThunk

                console.log("******* Bienvenue dans le login.fulfilled de AuthSlice");

                console.log("***action.payload de AuthSlice builder", action.payload);
                
                const token = action.payload.token;
                state.token = token;
                state.status = "success"; 
                state.error = null; 

                //stockage deuserId dans asyncstorage
                accountServices.saveToken(token);

            })
            .addCase(login.pending, (state) => { 

                console.log("******* Bienvenue dans le login.pending de AuthSlice");

                state.status = "loading"; 

            })
            .addCase(login.rejected, (state, action) => { 

               // console.log("******* Bienvenue dans le login.rejected de AuthSlice");
                state.status = "failed"; 
                state.error = action.payload;

                //déconnexion de l'utilisateur entrainant la suppression du token de assyncstorage
                accountServices.logout();

                console.log("***status dans login reject", state.status);
                

            });
             

    }


})

// Export des actions du reducers synchrone
export const { logout } = authSlice.actions;

// Export du reducer
const authReducer = authSlice.reducer;

export default authReducer