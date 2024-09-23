
import Axios from "./Caller.services";

let getArticles = () =>{
    return Axios.get("/articles/getAll")  //routes du back
}

let getArticle = (id) =>{
    return Axios.get("/articles/" +id)  
}

let updateArticle = (articlesObject) => {
    return Axios.put("/articles/" +articlesObject.id,  articlesObject)  
}

let deleteArticle = (id) => {
    return Axios.delete("/articles/" +id)  
}

let addArticle = (articlesObject) => {
    return Axios.post("/articles/add", articlesObject)  
}

export const articleServices = {
    getArticles, getArticle, updateArticle, deleteArticle, addArticle,
}