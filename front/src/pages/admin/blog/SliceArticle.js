import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


import { articleServices } from "../../../_services.js/Article.services";


// État initial
const initialState = {
    articles: [],
    article: null,
    status: null,
    error: null,
};

// Action asynchrone pour récupérer tous les articles
export const getArticles = createAsyncThunk(
    'article/getArticles',
    async (_, { rejectWithValue }) => {
        try {
            const response = await articleServices.getArticles();
            return response.data; // Adapte en fonction de la structure de la réponse
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Action asynchrone pour récupérer un article spécifique
export const getArticle = createAsyncThunk(
    'article/getArticle',
    async (id, { rejectWithValue }) => {
        try {
            const response = await articleServices.getArticle(id);
            return response.data; // Adapte en fonction de la structure de la réponse
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Action asynchrone pour mettre à jour un article
export const updateArticle = createAsyncThunk(
    'article/updateArticle',
    async (articleObject, { rejectWithValue }) => {
        try {
            const response = await articleServices.updateArticle(articleObject);
            return response.data; // Adapte en fonction de la structure de la réponse
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Action asynchrone pour supprimer un article
export const deleteArticle = createAsyncThunk(
    'article/deleteArticle',
    async (id, { rejectWithValue }) => {
        try {
            await articleServices.deleteArticle(id);
            return id; // On retourne l'id pour le supprimer du state
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Action asynchrone pour ajouter un article
export const addArticle = createAsyncThunk(
    'article/addArticle',
    async (articleObject, { rejectWithValue }) => {
        try {
            const response = await articleServices.addArticle(articleObject);
            return response.data; // Adapte en fonction de la structure de la réponse
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Création du slice
const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getArticles.fulfilled, (state, action) => {
                state.articles = action.payload;
                state.status = "success";
            })
            .addCase(getArticles.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getArticles.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getArticle.fulfilled, (state, action) => {
                state.article = action.payload;
                state.status = "success";
            })
            .addCase(getArticle.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getArticle.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                const index = state.articles.findIndex(article => article.id === action.payload.id);
                if (index !== -1) {
                    state.articles[index] = action.payload;
                }
                state.status = "success";
            })
            .addCase(updateArticle.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateArticle.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.articles = state.articles.filter(article => article.id !== action.payload);
                state.status = "success";
            })
            .addCase(deleteArticle.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteArticle.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addArticle.fulfilled, (state, action) => {
                state.articles.push(action.payload);
                state.status = "success";
            })
            .addCase(addArticle.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addArticle.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

// Exportation du reducer
const articleReducer =  articleSlice.reducer;
export default articleReducer;
