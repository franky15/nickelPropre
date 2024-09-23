 /****importation des modules nécessaires */
 const express = require("express");
 const router = express.Router(); 

 const bodyParser = require('body-parser');
  
 //importation du controller
 const stripeController = require('../controllers/stripeController');
 
 
 //impportation des routes
 
 router.post("/create-checkout-session",  stripeController.createCheckoutSession); 
 router.post("/stripe-webhook", stripeController.stripeWebhook);

 // Route pour récupérer les détails d'une session de paiement
 router.get("/session/:id", stripeController.getSessionDetails);
 
 
 /**
  * NB: Cette route nécessite obligatoirement bodyParser.raw car Stripe doit recevoir la requête brute (non modifiée) pour vérifier la signature. 
  * donc il faut convertir le json en raw pour que stripe puisse le lire d'ou l'utilisation de bodyParser.raw étant donné
  * que par défaut notre application express communique en json
  */
//router.post("/stripe-webhook",  bodyParser.raw({ type: 'application/json' }), stripeController.stripeWebhook);

 
 //exportation des routes
 module.exports = router;    