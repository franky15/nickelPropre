
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 


//importation des services
import { imageServices } from "../../../_services.js/image.services";


//gestion du state des services
const initialState = {

    services: null,
    service: null,
    status: null,
    error: null,
    
}



//creation de l'action asynchrone pour récupérer le chantier
export const getImage = createAsyncThunk(
    'image/getImage',
    async (id, { rejectWithValue }) => {
        try {
           
            console.log("***Bienvenue dans le getImage de sliceImage", id);

            const response = await imageServices.getImage(id);
           
            console.log("Réponse API dans getImage:", response);

            if (!response ) {
                throw new Error("La réponse de l'API est invalide");
            }

            return response;

        } catch (error) {
            console.error("Erreur dans getImage de sliceImage:", error.message);
            return rejectWithValue(error.message);
        }
    }
);


//creation de l'action asynchrone pour récupérer le Image
export const getImages = createAsyncThunk(
    'image/getImages',
    async (_, { rejectWithValue }) => {
        try {
            
            console.log("***Bienvenue dans le getImages de SliceImage");

            const response = await imageServices.getImages();

            console.log("Réponse API dans getImages:", response);

            if (!response) {
                throw new Error("La réponse de l'API est invalide");
            }

            return response;

        } catch (error) {
            console.error("Erreur dans getImages de sliceImage:", error.message);
            return rejectWithValue(error.message);
        }
    }
);


export const updateImage = createAsyncThunk(
    'image/updateImage',
    async (imagesObject, { rejectWithValue }) => {
        try {
            const response = await imageServices.updateImage(imagesObject);

            if (!response ) {
                throw new Error("Invalid response structure");
            }

            console.log("response.data.body", response.message);

            return response.message;

        } catch (error) {
            console.error("Error updating Image:", error.message);
            return rejectWithValue(error.message);
        }
    }
);


export const deleteImage = createAsyncThunk(

    'image/deleteImage', 
    async (imagesObject) => {

   
        await imageServices.deleteImage(imagesObject);

        console.log("imagesObject", imagesObject);

        return imagesObject;


    }
);

export const addImage = createAsyncThunk(
    'image/addImage',
    async (imagesObject, { rejectWithValue }) => {
        try {
            const response = await imageServices.addImage(imagesObject);

            if (!response ) {
                throw new Error("Invalid response structure");
            }

            console.log("response.data.body", response.message);

            return response.message;

        } catch (error) {
            console.error("Error updating image:", error.message);
            return rejectWithValue(error.message);
        }
    }
);



//création du slice pour gérer les actions et le state
export const imageSlice = createSlice({

    name: "image", // Nom du slice
    initialState, //transmission du state initial en fonction de l'authentification
    reducers: {}, // Définition des reducers de des parties synchrones
    
    extraReducers: (builder) => {

        builder
            .addCase(getImage.fulfilled, (state, action) => {

                console.log("*****Bienvenue dans le getImage.fulfilled de Slice");

                console.log("***action.payload de SliceImage", action.payload);

                state.image = action.payload;
                state.status = "success";
                //state.error = false;

            })
            .addCase(getImage.pending, (state, action) => {

                console.log("*****Bienvenue dans le getImage.pending de SliceImage");

                state.status = "loading";

            })
            .addCase(getImage.rejected, (state, action) => {

                console.log("*****Bienvenue dans le getImage.rejected de SliceImage");

                state.status = "failed";
                state.error = action.error.message;

            })////////////////////////
            .addCase(getImages.fulfilled, (state, action) => {

                console.log("*****Bienvenue dans le getImages.fulfilled de SliceImage");

                console.log("***action.payload de SliceImage", action.payload);

                state.images = action.payload;
                state.status = "success";

            })
            .addCase(getImages.pending, (state, action) => {

                console.log("*****Bienvenue dans le getImages.pending de SliceImage");

                state.status = "loading";

            })
            .addCase(getImages.rejected, (state, action) => {

                console.log("*****Bienvenue dans le getImages.rejected de SliceImage");

                state.status = "failed";
                //state.error = action.error.message;

            })////////////////////////
            .addCase(updateImage.fulfilled, (state, action) => {

                //récupération de l'index de l'image à modifier
                const index = state.images.findIndex((Image) => Image.id === action.payload.id);
                
                //modification du Image
                state.images[index] = action.payload;

            })
            .addCase(updateImage.pending, (state, action) => {

                console.log("*****Bienvenue dans le updateImage.pending de SliceImage");

                state.status = "loading";

            })
            .addCase(updateImage.rejected, (state, action) => {

                console.log("*****Bienvenue dans le updateImage.rejected de SliceImage");

                state.status = "failed";
                state.error = action.error.message;

            })////////////////////////
            .addCase(addImage.fulfilled, (state, action) => {

                console.log("*****Bienvenue dans le addImage.fulfilled de SliceImage");

                console.log("***action.payload de SliceImage", action.payload);

                state.services.push(action.payload);
                state.status = "success";

            })
            .addCase(addImage.pending, (state, action) => {

                console.log("*****Bienvenue dans le addImage.pending de SliceImage");

                state.status = "loading";

            })
            .addCase(addImage.rejected, (state, action) => {

                console.log("*****Bienvenue dans le addImage.rejected de SliceImage");

                state.status = "failed";
                state.error = action.error.message;

            })////////////////////////
            .addCase(deleteImage.fulfilled, (state, action) => {

                console.log("*****Bienvenue dans le deleteImage.fulfilled de SliceImage");

                console.log("***action.payload de SliceImage", action.payload);

                state.images = state.images.filter((Image) => Image.id !== action.payload.id);
                state.status = "success";

            })
            .addCase(deleteImage.pending, (state, action) => {

                console.log("*****Bienvenue dans le deleteImage.pending de SliceImage");

                state.status = "loading";

            })
            .addCase(deleteImage.rejected, (state, action) => {

                console.log("*****Bienvenue dans le deleteImage.rejected de SliceImage");

                state.status = "failed";
                state.error = action.error.message;

            })////////////////////////


    }



});


//exportation du reducer
const imagesReducer = imageSlice.reducer;
export default imagesReducer;