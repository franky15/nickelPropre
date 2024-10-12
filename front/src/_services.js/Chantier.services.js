
import Axios from "./Caller.services";

let getChantiers = () =>{
    return Axios.get("/chantiers/getAll")  //routes du back
}

let getChantier = (id) =>{
    return Axios.get("/chantiers/" +id)  
}

let updateChantier = (chantierObject) => {

    console.log('chantierObject', chantierObject);
    
    if(!chantierObject.id ){
        
        console.log('chantierObject.id n existe pas dans chantier.services', chantierObject.id);
    }
    
    return Axios.put("/chantiers/" +chantierObject.id,  chantierObject)  
}

let deleteChantier = (id) => {
    return Axios.delete("/chantiers/" +id)  
}

let addChantier = (chantierObject) => {

    console.log('***chantierObject dans chantierServices', chantierObject);

    return Axios.post("/chantiers/add/" +chantierObject.Users_id, chantierObject)  
}

export const chantierServices = {
    getChantiers, getChantier, updateChantier, deleteChantier, addChantier,
}