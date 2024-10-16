
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 


//importation des services
import { userServices } from "../../../_services.js/User.services";

//le choix de ce state est dû au fait que l'authentification est un état global donc on choisit le state global
const initialState = {

    users: [],
    user: {},
    status: null,
    error: null,
    
}



//creation de l'action asynchrone pour récupérer l'utilisateur
export const getUser = createAsyncThunk(
    'user/getUser',
    async (id, { rejectWithValue }) => {
        try {
           
            console.log("***Bienvenue dans le getUser de UserSlice", id);

            const response = await userServices.getUser(id);
           
            console.log("Réponse API dans getUser:", response);

            if (!response ) {
                throw new Error("La réponse de l'API est invalide");
            }

            return response;

        } catch (error) {
            console.error("Erreur dans getUser:", error.message);
            return rejectWithValue(error.message);
        }
    }
);


//creation de l'action asynchrone pour récupérer l'utilisateur
export const getUsers = createAsyncThunk(
    'user/getAllUser',
    async (_, { rejectWithValue }) => {
        try {
            // console.log("***Bienvenue dans le getUsers de UserSlice");

            const response = await userServices.getUsers();

            // console.log("Réponse API dans getUsers:", response);

            if (!response) {
                throw new Error("La réponse de l'API est invalide");
            }

            return response;

        } catch (error) {
            console.error("Erreur dans getUsers:", error.message);
            return rejectWithValue(error.message);
        }
    }
);


export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userObject, { rejectWithValue }) => {
        try {
            const response = await userServices.updateUser(userObject);

            if (!response ) {
                throw new Error("Invalid response structure");
            }

            console.log("response.data.body", response.message);

            return response.message;

        } catch (error) {
            console.error("Error updating user:", error.message);
            return rejectWithValue(error.message);
        }
    }
);


export const deleteUser = createAsyncThunk(

    'user/deleteUser', 
    async (userObject) => {

   
        await userServices.deleteUser(userObject);

        console.log("userObject", userObject);

        return userObject;


    }
);

export const createUser = createAsyncThunk(
    
    'user/createUser', 
    async (userObject) => {


        await userServices.addUser(userObject);

        console.log("userObject dans createUser", userObject);

        return userObject;

    }

);

//création du slice pour gérer les actions et le state
export const userSlice = createSlice({

    name: "user", // Nom du slice
    initialState, //transmission du state initial en fonction de l'authentification
    reducers: {}, // Définition des reducers de des parties synchrones
    
    extraReducers: (builder) => {

        builder
            .addCase(getUser.fulfilled, (state, action) => {

               // console.log("*****Bienvenue dans le getUser.fulfilled de UserSlice");

               // console.log("***action.payload de UserSlice", action.payload);
               
                state.user = [...state.user, action.payload];
                state.status = "success";

            })
            .addCase(getUser.pending, (state, action) => {

                //console.log("*****Bienvenue dans le getUser.pending de UserSlice");

                state.status = "loading";

            })
            .addCase(getUser.rejected, (state, action) => {

                //console.log("*****Bienvenue dans le getUser.rejected de UserSlice");

                state.status = "failed";
                state.error = action.error.message;

            })////////////////////////
            .addCase(getUsers.fulfilled, (state, action) => {

                //console.log("*****Bienvenue dans le getUsers.fulfilled de UserSlice");

                //console.log("***action.payload de UserSlice", action.payload);

                state.users = [...state.users, action.payload];
                state.status = "success";
                

            })
            .addCase(getUsers.pending, (state, action) => {

                //console.log("*****Bienvenue dans le getUsers.pending de UserSlice");

                state.status = "loading";

            })
            .addCase(getUsers.rejected, (state, action) => {

                //console.log("*****Bienvenue dans le getUsers.rejected de UserSlice");

                state.status = "failed";
                //state.error = action.error.message;

            })////////////////////////
            .addCase(updateUser.fulfilled, (state, action) => {

                // console.log("action", action);
                // console.log("action.payload", action.payload);
                // //récupération de l'index de l'utilisateur à modifier
                // const index = state.users.findIndex((user) => user.id === action.payload.id);
                
                // //modification de l'utilisateur
                // state.users[index] = action.payload;
                
                // state.status = "success";

            })
            .addCase(deleteUser.fulfilled, (state, action) => {

                //filtrage des utilisateurs à supprimer
                state.users = state.users.filter((user) => user.id !== action.payload.id);
                

            })////////////////////////
            .addCase(createUser.fulfilled, (state, action) => {

                console.log("*****Bienvenue dans le createUser.fulfilled de UserSlice", action.payload);
                
                //ajout de l'utilisateur dans la liste
                state.users = [...state.users, action.payload];
                state.status = "success";

            })
            .addCase(createUser.pending, (state, action) => {

                state.status = "loading";

            })
            .addCase(createUser.rejected, (state, action) => {

                state.status = "failed";
                state.error = action.error.message;

            })////////////////////////

    }



});


//exportation du reducer
const userReducer = userSlice.reducer;
export default userReducer;