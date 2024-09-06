
import Axios from "./Caller.services";

let getUsers = () =>{
    return Axios.get("/users")  //routes du back
}

let getUser = (id) =>{
    return Axios.get("/users/" +id)  //routes du back
}

let updateUser = (userObject) => {
    return Axios.put("/users/" +userObject.id,  userObject)  //on envoie user 
}

let deleteUser = (id) => {
    return Axios.delete("/users/" +id)  //on envoie user 
}

let addUser = (userObject) => {
    return Axios.post("/users/signum", userObject)  //on envoie user 
}

export const userServices = {
    getUsers, getUser, updateUser, deleteUser, addUser,
}