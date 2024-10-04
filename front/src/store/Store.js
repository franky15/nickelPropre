import  { configureStore } from '@reduxjs/toolkit';

//importation des reducers 
import authReducer from '../pages/auth/AuthSlice';
import userReducer from '../pages/admin/user/SliceUser';
import chantierReducer from '../pages/admin/chantier/SliceChantier';
import servicesReducer from '../pages/admin/service/SliceService';
import imagesReducer from '../pages/admin/banqueImages/SliceImage';
import articleReducer from '../pages/admin/blog/SliceArticle';



const store = configureStore({
    reducer: {
        // Add your reducers here
        auth: authReducer,
        user: userReducer,
        chantier: chantierReducer,
        service: servicesReducer,
        image: imagesReducer,
        article: articleReducer,
    }
});

export default store;