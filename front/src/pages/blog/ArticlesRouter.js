import React from "react";
import { Route, Routes } from "react-router-dom";

import { AddArticle, DeleteArticle, UpdateArticle, GetArticle, GetArticles  } from "./index";
import BlogLayout from "./BlogLayout";


import Error from "../../_utils/Error";

const ArticlesRouter = () => {
    return (
        <Routes>
            
            <Route element={<BlogLayout/>}>
                <Route index element={<GetArticles />} />
                <Route path="articles" element={<GetArticles />} />
                <Route path="articles/:id" element={<GetArticle />} />
                <Route path="add" element={<AddArticle />} />
                <Route path="update/:id" element={<UpdateArticle />} />
                <Route path="delete/:id" element={<DeleteArticle />} />
                
                <Route path="*" element={<Error />} />
            </Route>
           
        </Routes>
    );
};

export default ArticlesRouter;