//importation de la base de données
const DB = require("../mysql.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//importation du package pour les variables d'environnement
const dotenv = require("dotenv").config();

//post creation d'un chantier
exports.createChantier = async (req, res) => {

    console.log('****Bienvenue dans createChantier****');

    let client_id = parseInt(req.params.id);

    console.log('****client_id', client_id);

    const { userCreatorId, service, besoin, prix, status, dateAppel, heureAppel, datePrestation, prestataire, heurePrestation, infoComplementaire, adresse,ville, codePostal, nombrePlaces } = req.body;
    let idAuth = req.auth.userId;
    const role = req.auth.role;

    console.log('****req.body', req.body);
    console.log('****idAuth', idAuth);
    console.log('****role', role);

    let columnChantier = ["service", "besoin", "prix", "Users_id", "userCreatorId"];
    let chantier = [service, besoin, prix, client_id, userCreatorId];

    const addColumn = () => {
        if (status) {
            columnChantier.push("status");
            chantier.push(status);
        }
        if (dateAppel) {
            columnChantier.push("dateAppel");
            chantier.push(dateAppel);
        }
        if (heureAppel) {
            columnChantier.push("heureAppel");
            chantier.push(heureAppel);
        }
        if (datePrestation) {
            columnChantier.push("datePrestation");
            chantier.push(datePrestation);
        }
        if (prestataire) {
            columnChantier.push("prestataire");
            chantier.push( parseInt(prestataire) );
        }
        if (heurePrestation) {
            columnChantier.push("heurePrestation");
            chantier.push(heurePrestation);
        }
        if (infoComplementaire) {
            columnChantier.push("infoComplementaire");
            chantier.push(infoComplementaire);
        }
        if (adresse) {
            columnChantier.push("adresse");
            chantier.push(adresse);
        }
        if (ville) {
            columnChantier.push("ville");
            chantier.push(ville);
        }
        if (codePostal) {
            columnChantier.push("codePostal");
            chantier.push(codePostal);
        }
        if (nombrePlaces) {
            columnChantier.push("nombrePlaces");
            chantier.push(nombrePlaces);
        }
    };
    addColumn();

    let sqlInsertChantier = `INSERT INTO Chantiers (${columnChantier.join(',')}) VALUES (${columnChantier.map(() => '?').join(', ')})`;

    if (role === 'Admin' || role === 'User') {
        try {

            let resInsertChantier = await DB.query(sqlInsertChantier, chantier);
            
            resInsertChantier = resInsertChantier[0]; //permet récupérer l'objet métadonnées de la requête
           
            res.status(200).json({ message: "Chantier créé avec succès", resInsertChantier });
       
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la création du chantier" });
        }
    } else {
        console.log('****Vous n\'êtes pas autorisé à créer un chantier');
        res.status(401).json({ message: "Vous n'êtes pas autorisé à créer un chantier" });
    }
};



//get all chantiers
exports.getAllChantiers = async (req, res) => {
    let idAuth = req.auth.userId;
    const role = req.auth.role;

    console.log('****req.body', req.body);
    console.log('****idAuth', idAuth);
    console.log('****role', role);

    let sqlGetAllChantiers = `SELECT * FROM Chantiers`;

    if (role === 'Admin' || role === 'User') {
        try {
            let resGetAllChantiers = await DB.query(sqlGetAllChantiers);

            resGetAllChantiers = resGetAllChantiers[0]; //permet récupérer l'objet métadonnées de la requête
           
            res.status(200).json({ resGetAllChantiers });

        } catch (err) {
            console.log("***erreur dans la requête", err);
            res.status(500).json({ message: "Erreur lors de la récupération des chantiers" });
        }
    } else {
        console.log('****Vous n\'êtes pas autorisé à récupérer les chantiers');
        res.status(401).json({ message: "Vous n'êtes pas autorisé à récupérer les chantiers" });
    }
};



//get one chantier
exports.getOneChantier = async (req, res) => {
    let idChantier = parseInt(req.params.id);
    let idAuth = req.auth.userId;
    const role = req.auth.role;

    console.log('****req.body', req.body);
    console.log('****idAuth', idAuth);
    console.log('****role', role);

    let sqlGetOneChantier = `SELECT * FROM Chantiers WHERE id = ?`;

    if (role === 'Admin' || role === 'User') {
        try {
            let resGetOneChantier = await DB.query(sqlGetOneChantier, idChantier);
           
            resGetOneChantier = resGetOneChantier[0][0]; //permet récupérer l'objet métadonnées de la requête
            
            res.status(200).json({ resGetOneChantier });

        } catch (err) {
            console.log("***erreur dans la requête", err);
            res.status(500).json({ message: "Erreur lors de la récupération du chantier" });
        }
    } else {
        console.log('****Vous n\'êtes pas autorisé à récupérer le chantier');
        res.status(401).json({ message: "Vous n'êtes pas autorisé à récupérer le chantier" });
    }
};



//update one chantier
exports.updateChantier = async (req, res) => {
    let idChantier = parseInt(req.params.id);
    const { service, besoin, prix, status, dateAppel, heureAppel, datePrestation, prestataire, heurePrestation,infoComplementaire, adresse,ville, codePostal, nombrePlaces } = req.body;
    let idAuth = req.auth.userId;
    const role = req.auth.role;

    console.log('****req.body', req.body);
    console.log('****idAuth', idAuth);
    console.log('****role', role);

    let columnChantier = [ "service", "besoin", "prix", "status", "dateAppel", "heureAppel", "datePrestation", "prestataire", "heurePrestation", "infoComplementaire", "adresse", "ville", "codePostal", "nombrePlaces" ];
    let chantier = [service, besoin, prix, status, dateAppel, heureAppel, datePrestation, prestataire, heurePrestation, infoComplementaire, adresse, ville, codePostal, nombrePlaces];

    let sqlUpdateChantier = `UPDATE Chantiers SET ${columnChantier.map((column) => `${column} = ?`).join(', ')} WHERE id = ?`;

    if (role === 'Admin' || role === 'User') {
        try {
            const resUpdateChantier = await DB.query(sqlUpdateChantier, [...chantier, idChantier]);
            res.status(200).json({ message: "Chantier modifié avec succès", resUpdateChantier });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la modification du chantier" });
        }
    } else {
        console.log('****Vous n\'êtes pas autorisé à modifier le chantier');
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier le chantier" });
    }
};



//delete one chantier
exports.deleteChantier = async (req, res) => {
    let idChantier = parseInt(req.params.id);
    let idAuth = req.auth.userId;
    const role = req.auth.role;

    console.log('****req.body', req.body);
    console.log('****idAuth', idAuth);
    console.log('****role', role);

    let sqlDeleteChantier = `DELETE FROM Chantiers WHERE id = ?`;

    if (role === 'Admin' || role === 'User') {
        try {
            let resDeleteChantier = await DB.query(sqlDeleteChantier, idChantier);
            
            resDeleteChantier = resDeleteChantier[0]; //permet récupérer l'objet métadonnées de la requête
            res.status(200).json({ message: "Chantier supprimé avec succès", resDeleteChantier });
        
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Erreur lors de la suppression du chantier" });
        }
    } else {
        console.log('****Vous n\'êtes pas autorisé à supprimer le chantier');
        res.status(401).json({ message: "Vous n'êtes pas autorisé à supprimer le chantier" });
    }
};
