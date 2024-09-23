
import Axios from "./Caller.services";

let getImages = () =>{
    return Axios.get("/images/getAll")  //routes du back
}

let getImage = (id) =>{
    return Axios.get("/images/" +id)  
}

let updateImage = (imagesObject) => {
    return Axios.put("/images/" +imagesObject.id,  imagesObject)  
}

let deleteImage = (id) => {
    return Axios.delete("/images/" +id)  
}

let addImage = (imagesObject) => {
    return Axios.post("/images/add", imagesObject)  
}

export const imageServices = {
    getImages, getImage, updateImage, deleteImage, addImage,
}