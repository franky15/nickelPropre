
import Axios from "./Caller.services";

let getChantiers = () =>{
    return Axios.get("/chantiers/getAll")  //routes du back
}

let getChantier = (id) =>{
    return Axios.get("/chantiers/" +id)  
}

let updateChantier = (chantierObject) => {
    return Axios.put("/chantiers/" +chantierObject.id,  chantierObject)  
}

let deleteChantier = (id) => {
    return Axios.delete("/chantiers/" +id)  
}

let addChantier = (chantierObject) => {
    return Axios.post("/chantiers/add", chantierObject)  
}

export const chantierServices = {
    getChantiers, getChantier, updateChantier, deleteChantier, addChantier,
}