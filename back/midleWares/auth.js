

/* c'est ce middleware qui va vérifier si l'utilisateur est authentifié ou connecté
il est donc transmis aux routes qui nécessitent une authentification 
ainsi leur transmet certaines informations notamment celles de connexion*/


//importation du module nécessaire
const jwt = require('jsonwebtoken');

//importation du package pour les variables d'environnement  
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {

    try{

        console.log("*** bienvenue dans le middleware auth ***");
        
        //récupération du token dans le headers
        const token = req.headers.authorization.split(' ')[1];

        
        //vérification du token
        if(!token){

            console.log("***vous n'avez pas fourni de token");
            res.status(401).json({ message: "mot de passe incorrect ou adresse mail de l'utilisateur incorrect" });

        }else{

            console.log("***vous avez fourni un token");

            //décodage du token
            const decodeToken = jwt.verify(token, process.env.TOKEN_KEY);
            const userId = decodeToken.userId;
            const role = decodeToken.role;

            /*transmission des informations de connexion à la requête ou insertion de l'objet auth
            dans la requête ces informations pourront être utilisées dans les routes qui nécessitent une authentification
            */
            req.auth ={

                userId: userId,
                role: role
            };
        }
        next();
        
    }
    catch(error){

          res.status(401).json( { error })
    }
}
