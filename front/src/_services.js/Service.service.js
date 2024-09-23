
import Axios from "./Caller.services";

let getServices = () =>{
    return Axios.get("/services/getAll")  //routes du back
}

let getService = (id) =>{
    return Axios.get("/services/" +id)  
}

let updateService = (servicesObject) => {
    return Axios.put("/services/" +servicesObject.id,  servicesObject)  
}

let deleteService = (id) => {
    return Axios.delete("/services/" +id)  
}

let addService = (servicesObject) => {
    return Axios.post("/services/add", servicesObject)  
}

export const serviceServices = {
    getServices, getService, updateService, deleteService, addService,
}