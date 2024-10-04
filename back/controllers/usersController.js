
//importation de la base de données
const DB = require("../mysql.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//importation du package pour les variables d'environnement
const dotenv = require("dotenv").config();

//gestion des fichiers
const fs = require("fs");
const path = require("path");
const e = require("express");

//POST login connexion d'un utilisateur
exports.login = async (req, res, next) => {
    console.log("*** bienvenue dans login ***");

    const { email, password } = req.body;

    console.log("***req.body", req.body);   

    const sqlSelectUser = `SELECT * FROM Users WHERE email = ?`;

    try {
        const resSqlSelectUser = await DB.query(sqlSelectUser, email);

        console.log("***resSqlSelectUser", resSqlSelectUser);

        if (resSqlSelectUser[0][0].length !== 0) {

            //attention sur mysql2 on a un tableau de tableau en résultat c'est le premier tableau qui contient les données de la requête et le deuxième tableau qui contient les meta données d'ou le [0][0] pour accéder aux données
            const valid = await bcrypt.compare(password, resSqlSelectUser[0][0].password);

            console.log("****valid", valid);

            if (!valid) {
                return res.status(401).json({ message: "mot de passe incorrect ou email incorrect" });
            }

            const token = jwt.sign(
                {
                    userId: resSqlSelectUser[0][0].id,  //insertion de l'id de l'utilisateur dans le token
                    role: resSqlSelectUser[0][0].role,
                },
                process.env.TOKEN_KEY,
                { expiresIn: process.env.TOKEN_EXPIRE }
            );

            res.status(200).json({ token });
        } else {

            return res.status(401).json({ message: "Erreur de connexion" });

        }
    } catch (err) {

        console.error("Erreur de connexion :", err);
        res.status(500).json({ message: "Erreur de connexion", err });
    }
};


//POST Signum d'un utilisateur
exports.signum = async (req, res, next) => {
    console.log("*** bienvenue dans signum ***");

   
    console.log("$$req.body", req.body);

    const { reduction, nom, prenom, email, password, tel, adresse, ville, region, codePostal, genre, age, role, typeClient, service, besoin, dateAppel, heureAppel } = req.body;

    let roleUser = role || "Client"; 

    console.log("****roleUser", roleUser);

    const sqlSelectAllUsers = "SELECT * FROM Users";
    let hash = null;

    try {
        const resSqlSelectAllUsers = await DB.query(sqlSelectAllUsers);

        console.log("****resSqlSelectAllUsers", resSqlSelectAllUsers[0]);

        ////////////////////////////

        let usersEmailExist = email && resSqlSelectAllUsers[0].find((user) => user.email === email) 

        console.log("****usersEmailExist", usersEmailExist);

        if(usersEmailExist) {

            console.log("****Cet utilisateur existe déjà");
            return res.status(500).json({ message: "Cet utilisateur existe déjà" });
        }

        if (password) {
            try {
                hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
            } catch (err) {
                console.error("****Erreur lors du hashage du mot de passe:", err.message);
                return res.status(500).json({ err });
            }
        }

        
        // Vérification si un client existe avec le même nom et prénom ou le même téléphone
        let usersClientExist = roleUser === "Client" && resSqlSelectAllUsers.find((user) => (user.nom === nom && user.prenom === prenom) || user.tel === tel);

        if (usersClientExist) {
            console.log("****Ce client existe déjà");
        }


        ////////////////////////////

        let columns = [];
        let values = [];

       
        const addColumn = () => {

                
                if(nom) {
                    columns.push('nom');
                    values.push(nom);
                }
                if(prenom) {
                    columns.push('prenom');
                    values.push(prenom);
                }
                if(role) {
                    columns.push('role');
                    values.push(role);
                }
                if(tel) {
                    columns.push('tel');
                    values.push(tel);
                }

               
                if (adresse) {
                    columns.push('adresse');
                    values.push(adresse);
                }
                if (ville) {
                    columns.push('ville');
                    values.push(ville);
                }
                if (region) {
                    columns.push('region');
                    values.push(region);
                }
                if (codePostal) {
                    columns.push('codePostal');
                    values.push(codePostal);
                }
            
                if (genre) {
                    columns.push('genre');
                    values.push(genre);
                }
                if (age) {
                    columns.push('age');
                    values.push(age);
                }
                if (typeClient) {
                    columns.push('typeClient');
                    values.push(typeClient);
                }
                if (reduction) {
                    columns.push('reduction');
                    values.push(parseInt(reduction));
                }

                
            
                if(email) {
                    columns.push('email');
                    values.push(email);
                }
                if (password) {
                    columns.push('password');
                    values.push(hash);
                }
                    
        };

        //exécution de la fonction addColumn si le client n'existe pas dans le but d'éviter les doublons dans la base de données
         addColumn();

       
         let idUser;

         let  sqlInsertUsers
         let sqlMyrequeteUser 

         if(usersClientExist && !usersEmailExist){

            console.log("****Mise à jour d' un client");

            //requete de mise de l'utilisateur dans la base de données
            const sqlUpdateUser = `UPDATE Users SET ${columns.map((column) => `${column} = ?`).join(', ')} WHERE (nom = ? AND prenom = ?) OR tel = ?`;
            
            await DB.query(sqlUpdateUser, [...values, nom, prenom, tel]);

            idUser = usersClientExist.id;  // Récupérer l'id de l'utilisateur existant car insertId ne fonctionne pas pour une mise à jour

            res.status(200).json({ message: "Client modifié avec succès" });

        }else if(!usersEmailExist && !usersClientExist) {

            console.log("****Création d'un client ou d'un utilisateur");

            const sqlInsertUsers = `INSERT INTO Users (${columns.join(', ')}) VALUES (${columns.map(() => '?').join(', ')})`;
            const [resSqlInsertUsers] = await DB.query(sqlInsertUsers, values);
        
            idUser = resSqlInsertUsers.insertId;  // Utiliser insertId après une insertion

            //res.status(200).json({ message: "utilisateur créé avec succès" });
        
        }

         console.log("***sqlMyrequeteUser ", sqlMyrequeteUser);
       
        console.log("***idUser", idUser);

        let columnsChantier = [];
        let valuesChantier = [];

        const addColumnChantier = () => {
            if (service) {
                columnsChantier.push('service');
                valuesChantier.push(service);
            }
            if (besoin) {
                columnsChantier.push('besoin');
                valuesChantier.push(besoin);
            }
            if (dateAppel) {
                columnsChantier.push('dateAppel');
                valuesChantier.push(dateAppel);
            }
            if (heureAppel) {
                columnsChantier.push('heureAppel');
                valuesChantier.push(heureAppel);
            }
            if (idUser) {
                columnsChantier.push('Users_id');
                valuesChantier.push(idUser);
            }
        };

        addColumnChantier();

        if(service && besoin && dateAppel && heureAppel ) {  //&& idUser

            const sqlInsertChantier = `INSERT INTO Chantiers (${columnsChantier.join(', ')}) VALUES (${columnsChantier.map(() => '?').join(', ')})`;
            
            await DB.query(sqlInsertChantier, valuesChantier);

            res.status(200).json({  messageUser: "utilisateur et chantier créé ou modifié avec succès" });
        
            console.log("****chantier créé avec succès");

        }  

    } catch (err) {
        console.log("erreur dans la requete", err);
        res.status(500).json({ message: "Erreur dans la requête", err });
    }
};





//DELETE suppression d'un utilisateur
exports.deleteUser = async (req, res, next) => {
    console.log("*** bienvenue dans deleteUsers ***");

    let idAuth = req.auth.userId;
    const role = req.auth.role;
    let userIdFront = parseInt(req.params.id);

    const sqlSelectUser = `SELECT * FROM Users WHERE id = ?`;

    try {
        const resSqlSelectUser = await DB.query(sqlSelectUser, [userIdFront]);

        if (resSqlSelectUser[0][0].length === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé" });
        }

        if (role === "Admin" || role === "User") {
            const sqlDeleteUser = `DELETE FROM Users WHERE id = ?`;
            await DB.query(sqlDeleteUser, [userIdFront]);
            return res.status(200).json({ message: "utilisateur supprimé avec succès" });
        }

        res.status(401).json({ message: "vous n'êtes pas autorisé à supprimer un utilisateur" });
    } catch (err) {
        console.log("erreur dans la requete", err);
        res.status(500).json({ message: "Erreur dans la requête", err });
    }
};


//GET récupération de tous les utilisateurs
exports.getAllUsers = async (req, res, next) => {

    console.log("*** bienvenue dans getAllUsers ***");

    const role = req.auth.role;

    console.log("****req.auth", req.auth);

   

    const sqlSelectAllUsers = "SELECT * FROM Users";

    if (role === "Admin" || role === "User") {
        try {
            let resSqlSelectAllUsers = await DB.query(sqlSelectAllUsers);  //destructuration du tableau de tableau de mysql2 pour récupérer le premier tableau

            resSqlSelectAllUsers = resSqlSelectAllUsers[0];

            console.log("***resSqlSelectAllUsers", resSqlSelectAllUsers);

            if (resSqlSelectAllUsers.length === 0) {
                return res.status(404).json({ message: "Aucun utilisateur trouvé" });
            }

            res.status(200).json(resSqlSelectAllUsers);
        } catch (err) {
            console.log("erreur dans la requête", err);
            res.status(500).json({ message: "Erreur dans la requête", err });
        }
    } else {
        res.status(401).json({ message: "Vous n'êtes pas autorisé à voir tous les utilisateurs" });
    }
};


//GET récupération d'un utilisateur
exports.getUser = async (req, res, next) => {

    console.log("*** bienvenue dans getUser ***");
    console.log("req.query", req.query);

    const role = req.auth.role;
    const idAuth = parseInt(req.auth.userId);
    const userIdFront = parseInt(req.params.id);
   

    console.log("****idAuth", idAuth);
    console.log("****userIdFront", userIdFront);

    const sqlSelectUser = `SELECT * FROM Users WHERE id = ?`;

    try {
        let resSqlSelectUser = await DB.query(sqlSelectUser, [userIdFront]);

        resSqlSelectUser = resSqlSelectUser[0];

        if (resSqlSelectUser.length === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé" });
        }

        if (role === "Admin" || role === "User" || role === "Prestataire") {
            return res.status(200).json(resSqlSelectUser);
        } else {
            return res.status(401).json({ message: "Vous n'êtes pas autorisé à voir cet utilisateur" });
        }
    } catch (err) {
        console.error("Erreur dans la requête", err);
        res.status(500).json({ message: "Erreur dans la requête", err });
    }
};


// PUT modification d'un utilisateur
exports.updateUser = async (req, res, next) => {

    console.log("*** bienvenue dans updateUser ***");

    const { nom, prenom, email, password, tel, adresse, ville, region, codePostal, pays, genre, age, typeClient } = req.body;
    
    console.log("****req.body", req.body);

    const userId = parseInt(req.params.id);
    const idAuth = req.auth.userId;
    const role = req.auth.role;

    const sqlSelectUser = `SELECT * FROM Users WHERE id = ?`;

    try {
        let resSqlSelectUser = await DB.query(sqlSelectUser, userId);

        resSqlSelectUser = resSqlSelectUser[0];

        if (resSqlSelectUser.length === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé" });
        }

        let hashCurrentPassword;

        if (password) {
            try {
                hashCurrentPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));
            } catch (err) {
                console.error("Erreur lors du hashage du mot de passe:", err.message);
                return res.status(500).json({ err });
            }
        }

        let columns = ['nom', 'prenom'];
        let values = [nom, prenom,];

        const addColumn = () => {
            if (tel) columns.push('tel'), values.push(parseInt(tel));
            if (adresse) columns.push('adresse'), values.push(adresse);
            if (ville) columns.push('ville'), values.push(ville);
            if (pays) columns.push('pays'), values.push(pays);
            if (password) columns.push('password'), values.push(hashCurrentPassword);
            if (age) columns.push('age'), values.push(age);
            if (genre) columns.push('genre'), values.push(genre);
            if (codePostal) columns.push('codePostal'), values.push(codePostal);
            if (region) columns.push('region'), values.push(region);
            if (typeClient) columns.push('typeClient'), values.push(typeClient);
        };

        addColumn();

        const sqlUpdateUser = `UPDATE Users SET ${columns.map((column) => `${column} = ?`).join(', ')} WHERE id = ?`;

        if (role === "Admin" || role === "User") {
            await DB.query(sqlUpdateUser, [...values, userId]);
            return res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
        }

        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier cet utilisateur" });
    } catch (err) {
        console.error("Erreur lors de la requête:", err.message);
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", err });
    }
};

