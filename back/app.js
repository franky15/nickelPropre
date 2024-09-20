//import des modules nécessaires
const express = require("express");
const cors = require("cors"); 

//importation du module path pour la gestion des chemins de fichiers à cause de multer qui va enregistrer les fichiers (images)
const path = require('path');

const fs = require('fs');

//importation du package pour les variables d'environnement
const dotenv = require("dotenv").config();
// const bodyParser = require('body-parser');



//importation de la base de données
const db = require("./mysql.config")        
 
//importation des modules de routages

const userRoutes = require("./routes/usersRoutes");
const chantierRoutes = require("./routes/chantiersRoutes");
const articleRoutes = require("./routes/articlesRoutes"); 
const banqueImagesRoutes = require("./routes/BanqueImagesRoutes");
const servicesRoutes = require("./routes/servicesRoutes"); 
const stripeRoutes = require("./routes/stripeRoutes");
const stripeController = require('./controllers/stripeController'); // Ajoute directement le contrôleur
 

//creation de l'api
const app = express();     


var __dirname = path.resolve();  //récupération du chemin absolu du répertoire du fichier actuel si non on aura une erreur sur __dirname
app.use(cors());   //evite les erreurs cors

//gestion des routes de stripe
app.use("/stripe", stripeRoutes);

// Utiliser bodyParser.raw() uniquement pour le webhook Stripe
//app.post('/stripe/stripe-webhook', bodyParser.raw({ type: 'application/json' }), stripeController.stripeWebhook);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/users", userRoutes); 
app.use("/chantiers", chantierRoutes); 
app.use("/articles", articleRoutes);
app.use("/images", banqueImagesRoutes);
app.use("/services", servicesRoutes);






 


app.use('/images', express.static(path.join(__dirname, 'images')));  


module.exports = app;  