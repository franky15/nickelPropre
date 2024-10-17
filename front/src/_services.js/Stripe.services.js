
import Axios from "./Caller.services";


let paiment = (paiementObject) => {

    console.log('***paiementObject dans stripe.services', paiementObject);

    return Axios.post("/stripe/create-checkout-session", paiementObject)  
}



export const paiementServices = {
    paiment
}