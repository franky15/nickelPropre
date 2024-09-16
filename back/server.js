/***importation  */
const http = require("http");

//importation de l'application
const app = require("./app"); 

//importation du package pour les variables d'environnement
const dotenv = require("dotenv").config();



//pour éxécuter le __le dirname
const path = require('path');
 

app.set("port", process.env.PORT || process.env.PORT2);  

//creation du server
const server = http.createServer(app)     



//lancement du server
server.listen(process.env.PORT, () => { 
    console.log(`---------------ce server tourne au port ${process.env.PORT}-------------`)  
}) 