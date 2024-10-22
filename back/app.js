//import des modules nécessaires
const express = require("express");
const cors = require("cors"); 

//importation du module path pour la gestion des chemins de fichiers à cause de multer qui va enregistrer les fichiers (images)
const path = require('path');



/**
 * permet d'interagir avec le système de fichiers. Il fournit des méthodes pour lire, écrire, supprimer et manipuler des fichiers et des répertoires.
 */
const fs = require('fs');

//importation du package pour les variables d'environnement
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser'); //permet d'avoir accès aux données de la requête dans req.body 




//importation de la base de données
// const db = require("./mysql.config")   

let db 
//pour savoir si on est en mode production ou développement ce qui permettra de configurer l'application en fonction de l'environnement local ou de production par exemple base de données dlocale ou distante (en ligne RDS d'AWS ou autre)
if (process.env.NODE_ENV === 'production') {

  console.log('*****L’application est en mode production.*****');
  // Configurations spécifiques à la production

} else {

  console.log('*****L’application est en mode développement(en local).*****');
  
   db = require("./mysql.config")  
}
 
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

//exemple Supposons que le répertoire courant soit /home/user/project. Dans ce cas, path.resolve('images', 'photo.jpg') renverra /home/user/project/images/photo.jpg.
var __dirname = path.resolve();  //Résout une séquence de chemins en un chemin absolu, en utilisant le répertoire courant comme base du chemin absolu. puis le reste du chemin est ajouté à ce chemin absolu
app.use(cors());   //evite les erreurs cors 


// Utiliser bodyParser.raw() uniquement pour le webhook Stripe
/**
  * NB: Cette route nécessite obligatoirement bodyParser.raw car Stripe doit recevoir la requête brute (non modifiée) pour vérifier la signature. 
  * donc il faut convertir le json en raw pour que stripe puisse le lire d'ou l'utilisation de bodyParser.raw étant donné
  * que par défaut notre application express communique en json
  */
//Attention toujours palcer ces routes avant les routes qui utilisent express.json() ou express.urlencoded() sinon on aura une erreur car on ne souhaite pas convertir le json en raw
app.post('/stripe/stripe-webhook', bodyParser.raw({ type: 'application/json' }), stripeController.stripeWebhook);


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//app.use() permet d'utiliser un middleware qui est une fonction qui reçoit les objets request et response et qui peut effectuer une action sur ces objets et est contacté par le chemin de la requête
app.use("/users", userRoutes); 
app.use("/chantiers", chantierRoutes); 
app.use("/articles", articleRoutes);
app.use("/images", banqueImagesRoutes);
app.use("/services", servicesRoutes);

//gestion des routes de stripe
app.use("/stripe", stripeRoutes);



//configure un chemin statique pour servir des fichiers d'image.
//c'est ce middleware qui permet de servir ou de gérer les "images"  qui sont dans le dossier /images
//__dirname est le chemin absolu du répertoire du fichier actuel
app.use( '/images', express.static(path.join(__dirname, 'images')) );  


module.exports = app;  