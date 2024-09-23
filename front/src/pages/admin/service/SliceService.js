
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 


//importation des services
import { serviceServices } from "../../../_services.js/Service.service";



//gestion du state des services
const initialState = {

    services: null,
    service: null,
    status: null,
    error: null,
    
}



//creation de l'action asynchrone pour récupérer le chantier
export const getService = createAsyncThunk(
    'service/getService',
    async (id, { rejectWithValue }) => {
        try {
           
            console.log("***Bienvenue dans le getService de sliceService", id);

            const response = await serviceServices.getService(id);
           
            console.log("Réponse API dans getService:", response);

            if (!response ) {
                throw new Error("La réponse de l'API est invalide");
            }

            return response;

        } catch (error) {
            console.error("Erreur dans getService de slice:", error.message);
            return rejectWithValue(error.message);
        }
    }
);


//creation de l'action asynchrone pour récupérer le service
export const getServices = createAsyncThunk(
    'service/getServices',
    async (_, { rejectWithValue }) => {
        try {
            
            console.log("***Bienvenue dans le getServices de SliceService");

            const response = await serviceServices.getServices();

            console.log("Réponse API dans getServices:", response);

            if (!response) {
                throw new Error("La réponse de l'API est invalide");
            }

            return response;

        } catch (error) {
            console.error("Erreur dans getChantiers de sliceService:", error.message);
            return rejectWithValue(error.message);
        }
    }
);


export const updateService = createAsyncThunk(
    'service/updateService',
    async (servicesObject, { rejectWithValue }) => {
        try {
            const response = await serviceServices.updateService(servicesObject);

            if (!response ) {
                throw new Error("Invalid response structure");
            }

            console.log("response.data.body", response.message);

            return response.message;

        } catch (error) {
            console.error("Error updating service:", error.message);
            return rejectWithValue(error.message);
        }
    }
);


export const deleteService = createAsyncThunk(

    'service/deleteService', 
    async (servicesObject) => {

   
        await serviceServices.deleteService(servicesObject);

        console.log("servicesObject", servicesObject);

        return servicesObject;


    }
);

export const addService = createAsyncThunk(
    'service/addService',
    async (servicesObject, { rejectWithValue }) => {
        try {
            const response = await serviceServices.addService(servicesObject);

            if (!response ) {
                throw new Error("Invalid response structure");
            }

            console.log("response.data.body", response.message);

            return response.message;

        } catch (error) {
            console.error("Error updating service:", error.message);
            return rejectWithValue(error.message);
        }
    }
);



//création du slice pour gérer les actions et le state
export const serviceSlice = createSlice({

    name: "service", // Nom du slice
    initialState, //transmission du state initial en fonction de l'authentification
    reducers: {}, // Définition des reducers de des parties synchrones
    
    extraReducers: (builder) => {

        builder
            .addCase(getService.fulfilled, (state, action) => {

                console.log("*****Bienvenue dans le getService.fulfilled de Slice");

                console.log("***action.payload de Slice", action.payload);

                state.service = action.payload;
                state.status = "success";
                //state.error = false;

            })
            .addCase(getService.pending, (state, action) => {

                console.log("*****Bienvenue dans le getService.pending de Slice");

                state.status = "loading";

            })
            .addCase(getService.rejected, (state, action) => {

                console.log("*****Bienvenue dans le getService.rejected de Slice");

                state.status = "failed";
                state.error = action.error.message;

            })////////////////////////
            .addCase(getServices.fulfilled, (state, action) => {

                console.log("*****Bienvenue dans le getServices.fulfilled de servicesSlice");

                console.log("***action.payload de servicesSlice", action.payload);

                state.services = action.payload;
                state.status = "success";

            })
            .addCase(getServices.pending, (state, action) => {

                console.log("*****Bienvenue dans le getServices.pending de servicesSlice");

                state.status = "loading";

            })
            .addCase(getServices.rejected, (state, action) => {

                console.log("*****Bienvenue dans le getServices.rejected de serviceSlice");

                state.status = "failed";
                //state.error = action.error.message;

            })////////////////////////
            .addCase(updateService.fulfilled, (state, action) => {

                //récupération de l'index du chantier à modifier
                const index = state.services.findIndex((service) => service.id === action.payload.id);
                
                //modification du chantier
                state.services[index] = action.payload;

            })
            .addCase(updateService.pending, (state, action) => {

                console.log("*****Bienvenue dans le updateService.pending de chantierSlice");

                state.status = "loading";

            })
            .addCase(updateService.rejected, (state, action) => {

                console.log("*****Bienvenue dans le updateService.rejected de chantierSlice");

                state.status = "failed";
                state.error = action.error.message;

            })////////////////////////
            .addCase(addService.fulfilled, (state, action) => {

                console.log("*****Bienvenue dans le addService.fulfilled de serviceSlice");

                console.log("***action.payload de serviceSlice", action.payload);

                state.services.push(action.payload);
                state.status = "success";

            })
            .addCase(addService.pending, (state, action) => {

                console.log("*****Bienvenue dans le addService.pending de serviceSlice");

                state.status = "loading";

            })
            .addCase(addService.rejected, (state, action) => {

                console.log("*****Bienvenue dans le addService.rejected de servicesSlice");

                state.status = "failed";
                state.error = action.error.message;

            })////////////////////////
            .addCase(deleteService.fulfilled, (state, action) => {

                console.log("*****Bienvenue dans le deleteService.fulfilled de serviceSlice");

                console.log("***action.payload de serviceSlice", action.payload);

                state.services = state.services.filter((service) => service.id !== action.payload.id);
                state.status = "success";

            })
            .addCase(deleteService.pending, (state, action) => {

                console.log("*****Bienvenue dans le deleteService.pending de serviceSlice");

                state.status = "loading";

            })
            .addCase(deleteService.rejected, (state, action) => {

                console.log("*****Bienvenue dans le deleteService.rejected de serviceSlice");

                state.status = "failed";
                state.error = action.error.message;

            })////////////////////////


    }



});


//exportation du reducer
const servicesReducer = serviceSlice.reducer;
export default servicesReducer;