
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 


//importation des services
import { chantierServices } from "../../../_services.js/Chantier.services";

//gestion du state des chantiers
const initialState = {

    chantiers: null,
    chantier: null,
    status: null,
    error: null,
    
}



//creation de l'action asynchrone pour récupérer le chantier
export const getChantier = createAsyncThunk(
    'chantier/getChantier',
    async (id, { rejectWithValue }) => {
        try {
           
            console.log("***Bienvenue dans le getChantier de slice", id);

            const response = await chantierServices.getChantier(id);
           
            console.log("Réponse API dans getChantier:", response);

            if (!response ) {
                throw new Error("La réponse de l'API est invalide");
            }

            return response;

        } catch (error) {
            console.error("Erreur dans getChantier de slice:", error.message);
            return rejectWithValue(error.message);
        }
    }
);


//creation de l'action asynchrone pour récupérer l'utilisateur
export const getChantiers = createAsyncThunk(
    'chantier/getChantiers',
    async (_, { rejectWithValue }) => {
        try {
            
            console.log("***Bienvenue dans le getChantiers de Slice");

            const response = await chantierServices.getChantiers();

            console.log("Réponse API dans getChantiers:", response);

            if (!response) {
                throw new Error("La réponse de l'API est invalide");
            }

            return response;

        } catch (error) {
            console.error("Erreur dans getChantiers de slice:", error.message);
            return rejectWithValue(error.message);
        }
    }
);


export const updateChantier = createAsyncThunk(
    'chantier/updateChantier',
    async (chantierObject, { rejectWithValue }) => {
        try {
            const response = await chantierServices.updateChantier(chantierObject);

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


export const deleteChantier = createAsyncThunk(

    'chantier/deleteChantier', 
    async (chantierObject) => {

   
        await chantierServices.deleteChantier(chantierObject);

        console.log("chantierObject", chantierObject);

        return chantierObject;


    }
);

export const addChantier = createAsyncThunk(
    'chantier/addChantier',
    async (chantierObject, { rejectWithValue }) => {
        try {
            const response = await chantierServices.addChantier(chantierObject);

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



//création du slice pour gérer les actions et le state
export const chantierSlice = createSlice({

    name: "chantier", // Nom du slice
    initialState, //transmission du state initial en fonction de l'authentification
    reducers: {}, // Définition des reducers de des parties synchrones
    
    extraReducers: (builder) => {

        builder
            .addCase(getChantier.fulfilled, (state, action) => {

                console.log("*****Bienvenue dans le getChantier.fulfilled de Slice");

                console.log("***action.payload de Slice", action.payload);

                state.chantier = action.payload;
                state.status = "success";
                //state.error = false;

            })
            .addCase(getChantier.pending, (state, action) => {

                //console.log("*****Bienvenue dans le getChantier.pending de Slice");

                state.status = "loading";

            })
            .addCase(getChantier.rejected, (state, action) => {

                console.log("*****Bienvenue dans le getChantier.rejected de Slice");

                state.status = "failed";
                state.error = action.error.message;

            })////////////////////////
            .addCase(getChantiers.fulfilled, (state, action) => {

                console.log("*****Bienvenue dans le getChantiers.fulfilled de chantierSlice");

                console.log("***action.payload de chantierSlice", action.payload);

                state.chantiers = action.payload;
                state.status = "success";

            })
            .addCase(getChantiers.pending, (state, action) => {

                console.log("*****Bienvenue dans le getChantiers.pending de chantierSlice");

                state.status = "loading";

            })
            .addCase(getChantiers.rejected, (state, action) => {

                console.log("*****Bienvenue dans le getChantiers.rejected de chantierSlice");

                state.status = "failed";
                //state.error = action.error.message;

            })////////////////////////
            .addCase(updateChantier.fulfilled, (state, action) => {

                //récupération de l'index du chantier à modifier
                const index = state.chantiers.findIndex((chantier) => chantier.id === action.payload.id);
                
                //modification du chantier
                state.users[index] = action.payload;

            })
            .addCase(deleteChantier.fulfilled, (state, action) => {

                //filtrage des chantiers différents de celui à supprimer
                state.chantiers = state.chantiers.filter((chantier) => chantier.id !== action.payload.id);

            })
            .addCase(addChantier.fulfilled, (state, action) => {

                console.log("*****Bienvenue dans le addChantier.fulfilled de chantierSlice");

                console.log("***action.payload de chantierSlice", action.payload);

                state.chantiers.push(action.payload);
                state.status = "success";

            })
            .addCase(addChantier.pending, (state, action) => {

                console.log("*****Bienvenue dans le addChantier.pending de chantierSlice");

                state.status = "loading";

            })
            .addCase(addChantier.rejected, (state, action) => {

                console.log("*****Bienvenue dans le addChantier.rejected de chantierSlice");

                state.status = "failed";
                state.error = action.error.message;

            })////////////////////////


    }



});


//exportation du reducer
const chantierReducer = chantierSlice.reducer;
export default chantierReducer;