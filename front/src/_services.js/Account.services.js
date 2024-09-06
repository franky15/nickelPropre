
import Axios from "./Caller.services"


// gestion de la connexion
let login = (loginObject) => {
    
    return Axios.post("/users/login", loginObject) //ici on aura donc la requête  axios.post("http://localhost:3000/auth/login", loginObject)
}                                      


//gestion du token dans le localstorage
let saveToken = (token) => {  
    
    localStorage.setItem("token", token) //enregistrement du token dans le localstorage
}

let logout = () => {

    localStorage.removeItem("token")  //supression du token dans le localstorage
}

let getToken = () => {
    return localStorage.getItem("token")  //récupération du token dans le localStorage
}

let isLogged = () => {
    
    let token = localStorage.getItem("token")

    return !!token //transformation d'une variable en booléen ici ça veut dire s'il y a un token on retournera true (!!)  inversement s'il n'y a pas de token return false(!) 
}



export const accountServices = {  //exportation de l'objet accountServices qui va contenir ces trois
    login, saveToken, logout, isLogged, getToken
}