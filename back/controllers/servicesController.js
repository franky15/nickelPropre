//importation de la base de données
const moment = require('moment'); //permet de formater la date

const DB = require("../mysql.config");
const bcrypt = require("bcrypt");

const path = require("path");
const fs = require("fs");


//POST création d'un Services
exports.createService = async (req, res, next) => {
    console.log("*** bienvenue dans createService ***");

    let role = req.auth.role;
    let idAuth = parseInt(req.auth.userId);

    console.log("***req.body", req.body); 
    console.log("***req.file", req.file);  
    console.log("***role", role);
    console.log("***idAuth", idAuth);

    if (role !== 'Admin' && role !== 'User') {
        return res.status(401).json({ message: "Vous n'êtes pas autorisé à créer un Service" });
    }

    let { nom, description, alt_text } = req.body;

    // Validation des champs obligatoires
    if (!nom || !description) {
        return res.status(400).json({ message: "Nom et description sont obligatoires." });
    }

    
    let pictureformat;
    if (req.file !== undefined && req.file.filename !== undefined) {

        console.log("***req.file existe", req.file);
        //pictureformat = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        pictureformat = `${req.file.filename}`; // Stockage uniquement du nom du fichier tel qu'il est arrivé du front
    
    } 

    let columns = [ "Users_id", "nom", "description"];
    let values = [idAuth, nom, description];
    

    const sqlInsertService = `INSERT INTO Services (${columns.join(',')}) VALUES (${columns.map(() => '?').join(', ')})`;
    console.log("***sqlInsertService", sqlInsertService);

    try {

        //creation du Service
        const [result] = await DB.query(sqlInsertService, values);
        console.log("*** Service créé avec succès");

        // Création de l'image associée au Service
        let columnsImage = ["Users_id", "Services_id", "file_path"];
        let valuesImage = [idAuth, result.insertId, pictureformat];

        if (alt_text) {
            columnsImage.push("alt_text");
            valuesImage.push(alt_text);  
        }

        const sqlInsertBanqueImage = `INSERT INTO BanqueImages (${columnsImage.join(',')}) VALUES (${columnsImage.map(() => '?').join(', ')})`;
        const resSqlInsertBanqueImage = await DB.query(sqlInsertBanqueImage, valuesImage);

        res.status(200).json({ message: "Service et image créés avec succès", resSqlInsertBanqueImage });
    } catch (err) {
        console.error("Erreur lors de la création du Service :", err);
        res.status(500).json({ message: "Erreur lors de la création du Service", err });
    }
};


//GET récupération de tous les Service
exports.getAllServices = async (req, res, next) => {
    console.log("*** bienvenue dans getAllServices ***");

    //requette de récupération de tous les Services et des images associées
    /**
     *  récupération de toutes les colonnes de la table Services et de la colonne file_path et alt_text de la table BanqueImagesChantiers   SELECT Articles.*, BanqueImagesChantiers.file_path, BanqueImagesChantiers.alt_text 
     * jointure de (FROM) la table Services avec (JOIN) la table BanqueImages en récupérant toutes les lignes du coté gauche (LEFT) c'est a dire de la table Articles même si pas de correspondance avec les lignes de BanqueImagesChantiers selesctionnées  LEFT JOIN BanqueImagesChantiers ON Articles.id = BanqueImagesChantiers.Articles_id car lable de gauche est plus longue que la table de droite
     * condition de jointure (ON) entre les deux tables sur la colonne id de la table Services et la colonne Services_id de la table BanqueImagesChantiers
     * 
     * RIGHT JOIN récupère toutes les lignes de la table de droite même si pas de correspondance avec les lignes de la table de gauche (des images sans aServices ne seront pas récupérées)
     * INNER JOIN récupère uniquement les lignes qui ont une correspondance dans les deux tables (des Services sans images ne seront pas récupérés)
     */
    const sqlSelectAllServices = `SELECT Services.*, BanqueImages.file_path, BanqueImages.alt_text  
     FROM Services LEFT JOIN BanqueImages 
     ON Services.id = BanqueImages.Services_id`;

    try {
        let resSqlSelectAllServices = await DB.query(sqlSelectAllServices);

        resSqlSelectAllServices = resSqlSelectAllServices[0];

        console.log("*** Services récupérés avec succès", resSqlSelectAllServices);

        res.status(200).json({ resSqlSelectAllServices });
    } catch (err) {
        console.log("erreur dans la requête", err.message);
        res.status(500).json({ message: "Erreur dans la requête" });
    }
};



//GET récupération d'un Service
exports.getOneService = async (req, res, next) => {
    console.log("*** bienvenue dans getOneService ***");

    //récupération du paramètre id dans l'url et conversion en entier
    let idParams = parseInt(req.params.id);

    console.log("***idParams", idParams);

    //requette de récupération de tous les Service et des images associées
    /**
     * récupération de toutes les colonnes de la table Services et de la colonne file_path et alt_text de la table BanqueImagesChantiers   SELECT Services.*, BanqueImagesChantiers.file_path, BanqueImagesChantiers.alt_text
     * jointure de (FROM) la table Services avec (JOIN) la table BanqueImages en récupérant toutes les lignes du coté gauche (LEFT) c'est a dire de la table Services même si pas de correspondance avec les lignes de BanqueImagesChantiers selesctionnées  LEFT JOIN BanqueImagesChantiers ON Services.id = BanqueImagesChantiers.Services_id
     * condition de jointure (ON) entre les deux tables sur la colonne id de la table Services et la colonne Services_id de la table BanqueImagesChantiers
     * condition de selection (WHERE) sur la colonne id de la table Services
     * 
     * RIGHT JOIN récupère toutes les lignes de la table de droite même si pas de correspondance avec les lignes de la table de gauche (des images sans Services ne seront pas récupérées)
     * INNER JOIN récupère uniquement les lignes qui ont une correspondance dans les deux tables (des Services sans images ne seront pas récupérés)
     * 
     * condition de selection (WHERE) sur la colonne id de la table Services
     * 
     * pas besoin d'un AND BanqueImages.Services_id = ? car l'image peut ne pas exister
     */  
    const sqlSelectService = `SELECT Services.*, BanqueImages.file_path, BanqueImages.alt_text
        FROM Services LEFT JOIN BanqueImages
        ON Services.id = BanqueImages.Services_id
        WHERE Services.id = ?`;

    try {
        let resSqlSelectService = await DB.query(sqlSelectService, [idParams]);

        resSqlSelectService = resSqlSelectService[0];

        if (resSqlSelectService.length === 0) {

            console.log("*** Aucun Services trouvé");
            return res.status(404).json({ message: "Aucun Service trouvé" });

        }
        console.log("*** Article récupéré avec succès", resSqlSelectService);
        res
        res.status(200).json({ resSqlSelectService });
    } catch (err) {
        console.log("erreur dans la requête", err.message);
        res.status(500).json({ message: "Erreur dans la requête" });
    }
};





//DELETE suppression d'un Service
exports.deleteService = async (req, res, next) => {
    console.log("*** bienvenue dans deleteServices ***");

    let idParams = parseInt(req.params.id);

    console.log("***idParams", idParams);

    const sqlSelectService = `SELECT * FROM Services LEFT JOIN BanqueImages ON Services.id = BanqueImages.Services_id WHERE Services.id = ?`;

    try {
        let resSqlSelectService = await DB.query(sqlSelectService, [idParams]);

        resSqlSelectService = resSqlSelectService[0];

        if (resSqlSelectService.length === 0) {
            console.log("***Aucun Service trouvé");
            return res.status(404).json({ message: "Aucun Service trouvé" });
        }

        const Service = resSqlSelectService[0];

        console.log("***Service", Service);

        const imagePath = Service.file_path;

        console.log("***imagePath", imagePath);

        // Suppression du fichier image du système de fichiers
        if (imagePath) {

            let imageName = imagePath;

            //vérification si le chemin stocké dans la base de données contient une URL complète, extraire uniquement le nom du fichier
            if (imagePath.includes('/')) {
                imageName = imagePath.split('/').pop(); // split sur le caractère '/' obtient un tableau et pop() récupère le dernier élément du tableau et le retourne qui est le nom du fichier
            }

            console.log("***imageName", imageName);

            const fullImagePath = path.join('images', imageName);

            console.log("***fullImagePath", fullImagePath);

            try {
                fs.unlinkSync(fullImagePath);
                console.log("Image supprimée avec succès");
            } catch (err) {
                console.log("Erreur lors de la suppression du fichier image", err);
                return res.status(500).json({ message: "Erreur lors de la suppression du fichier image" });
            }
        }

        // Suppression du Service et de l'image associée dans la base de données
        const sqlDeleteService = `DELETE Services, BanqueImages 
                                  FROM Services 
                                  LEFT JOIN BanqueImages 
                                  ON Services.id = BanqueImages.Services_id 
                                  WHERE Services.id = ?`;

        await DB.query(sqlDeleteService, [idParams]);

        console.log("*** Service supprimé avec succès");

        res.status(200).json({ message: "Service et image supprimés avec succès" });

    } catch (err) {
        console.log("Erreur dans la requête de suppression", err.message);
        res.status(500).json({ message: "Erreur dans la requête de suppression", err });
    }
};







//PUT modification d'un Services
exports.updateService = async (req, res, next) => {
    console.log("*** bienvenue dans updateService ***");

    let idParams = parseInt(req.params.id);

    console.log("***idParams", idParams);

    let { nom, description } = req.body;
    
    let pictureformat;
    if (req.file !== undefined && req.file.filename !== undefined) {

        console.log("***req.file existe", req.file);
        //pictureformat = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        pictureformat = `${req.file.filename}`; // Stockage uniquement du nom du fichier tel qu'il est arrivé du front
    
    } 

    console.log("***pictureformat", pictureformat);

    const columns = ["nom", "description"];
    const values = [nom, description];

    if (pictureformat) {
        columns.push("file_path");
        values.push(pictureformat);
    }

    const sqlSelectService = `SELECT * FROM Services LEFT JOIN BanqueImages 
                            ON Services.id = BanqueImages.Services_id 
                            WHERE Services.id = ?`;

    const sqlUpdateService = `UPDATE Services, BanqueImages 
                              SET ${columns.map((col) => `${col} = ?`).join(', ')} 
                              WHERE Services.id = ? 
                              AND BanqueImages.Services_id = ?`;

  

    try {
        let resSqlSelectService = await DB.query(sqlSelectService, [idParams]);

        resSqlSelectService = resSqlSelectService[0];

        console.log("***resSqlSelectService", resSqlSelectService);

        if (resSqlSelectService.length === 0) {
            console.log("*** Aucun Service trouvé");
            return res.status(404).json({ message: "Aucun Service trouvé" });
        }

        const Service = resSqlSelectService[0];

        console.log("***Service", Service);

        const oldImagePath = Service.file_path;

        console.log("***oldImagePath", oldImagePath);

        // Suppression de l'ancienne image physique si une nouvelle image a été téléchargée
        if ((req.file || req.file !== null )  && (oldImagePath || oldImagePath  !== null)) {
            try {

                //récupération du nom du fichier image

                const imageName = oldImagePath;

                // Si le chemin contient une URL complète, extraire uniquement le nom du fichier
                if (oldImagePath.includes('/')) {
                    imageName = oldImagePath.split('/').pop(); // Obtenir uniquement le nom du fichier
                }
                
                console.log("***imageName", imageName);

                const fullImagePath = path.join('images', imageName);

                console.log("***fullImagePath", fullImagePath);

                try {
                    fs.unlinkSync(fullImagePath);
                    console.log("***Image supprimée avec succès");
                }catch (err) {
                    console.log("erreur dans la suppression de l'image", err.message);
                    res.status(500).json({ message: "erreur dans la suppression de l'image" });

                }
            
            } catch (err) {
                console.log("Erreur lors de la suppression de l'ancienne image", err);
                return res.status(500).json({ message: "Erreur lors de la suppression de l'ancienne image" });
            }
        }


        await DB.query(sqlUpdateService, [...values, idParams, idParams]);

        console.log("*** Service mis à jour avec succès");

        res.status(200).json({ message: "Service mis à jour avec succès" });

    } catch (err) {
        console.log("Erreur dans la requête de mise à jour", err.message);
        res.status(500).json({ message: "Erreur dans la requête de mise à jour" });
    }
};

