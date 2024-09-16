//importation de la base de données
const DB = require("../mysql.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//importation du package pour les variables d'environnement
const dotenv = require("dotenv").config();


//POST creation d'un vêtement
exports.createImage = async (req, res, next) => {
    console.log("*** bienvenue dans createImage ***");
    console.log("***req.body", req.body);

    let role = req.auth.role;
    let idAuth = req.auth.userId;
    let { Users_id, Articles_id, Services_id, alt_text } = req.body;

    console.log("**role", role);
    console.log("**idAuth", idAuth);

    console.log("***req.file", req.file); 


    let pictureformat;
    if (req.file !== undefined && req.file.filename !== undefined) {
        console.log("***req.file existe", req.file);
        pictureformat = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    } else {
        console.log("***Pas de fichier uploadé ou le fichier n'a pas de nom");
        pictureformat = ''; // ou une autre valeur par défaut
    }

    let column = [ "file_path"];
    let values = [pictureformat];

    const addColumn = () => {
        if (alt_text) {
            column.push("alt_text");
            values.push(alt_text);
        }
        if (Users_id) {
            column.push("Users_id");
            values.push(Users_id);
        }
        if (Articles_id) {
            column.push("Articles_id");
            values.push(Articles_id);
        }
        if (Services_id) {
            column.push("Services_id");
            values.push(Services_id);
        }
    };
    addColumn();

    let sqlInsertBanqueImage = `INSERT INTO BanqueImages (${column.join(',')}) VALUES (${column.map(() => '?').join(', ')})`;

    if (role === "Admin" || role === "User") {
        try {
            let resSqlInsertBanqueImage = await DB.query(sqlInsertBanqueImage, values);
            
            resSqlInsertBanqueImage= resSqlInsertBanqueImage[0];

            console.log("*** BanqueImage créé avec succès");

            res.status(200).json(resSqlInsertBanqueImage);

        } catch (err) {
            console.log("erreur dans la requête", err.message);
            res.status(500).json({ message: "erreur dans la requête" });
        }
    } else {
        res.status(401).json({
            message: "Vous n'êtes pas autorisé à créer des images dans la Banque Images, veuillez demander les droits",
        });
    }
};



//GET all images from BanqueImages
exports.getAllImages = async (req, res, next) => {
    console.log("***Bienvenue dans getAllImages***");

    try {
        let resAllImages = await DB.query(`SELECT * FROM BanqueImages`);
        
        resAllImages = resAllImages[0];

        console.log("*** BanqueImage récupéré avec succès");

        res.status(200).json(resAllImages);
    } catch (err) {
        console.log("erreur dans la requête", err.message);
        res.status(500).json({ message: "erreur dans la requête" });
    }
};



//GET one image from BanqueImages
exports.getOneImage = async (req, res, next) => {
    console.log("***Bienvenue dans getOneImage***");

    let idParams = parseInt(req.params.id);
    console.log("***idImage", idParams);

    try {
        let resOneImage = await DB.query(`SELECT * FROM BanqueImages WHERE id = ?`, idParams);
       
        resOneImage = resOneImage[0];
       
        if (resOneImage.length === 0) {
            console.log("***Aucune image trouvée");
            return res.status(404).json({ message: "Aucune image trouvée" });
        }
        console.log("*** BanqueImage récupéré avec succès");
        res.status(200).json(resOneImage);
    } catch (err) {
        console.log("erreur dans la requête", err.message);
        res.status(500).json({ message: "erreur dans la requête" });
    }
};



//PUT update one image from BanqueImages
exports.updateOneImage = async (req, res, next) => {
    console.log("***Bienvenue dans updateOneImage***");

    let idParams = parseInt(req.params.id);
    //let { file_path, alt_text } = req.body;
    let { alt_text } = req.body;

    let pictureformat;
    if (req.file !== undefined && req.file.filename !== undefined) {
        console.log("***req.file existe", req.file);
        pictureformat = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    } 

    let column = [];
    let values = [];

    const addColumn = () => {

        if (pictureformat) {
            column.push("file_path");
            values.push(pictureformat);
        }
       
        if (alt_text) {
            column.push("alt_text");
            values.push(alt_text);
        }
    };
    addColumn();

    // S'assurer qu'il y a au moins une colonne à mettre à jour
    if (column.length === 0) {
        return res.status(400).json({ message: "Aucune donnée à mettre à jour" });
    }
    
    let sqlUpdateBanqueImage = `UPDATE BanqueImages SET ${column.map((col) => `${col} = ?`).join(', ')} WHERE id = ?`;

    if (req.auth.role === "Admin" || req.auth.role === "User") {
        try {
            let resSqlUpdateBanqueImage = await DB.query(sqlUpdateBanqueImage, [...values, idParams]);
            
            resSqlUpdateBanqueImage = resSqlUpdateBanqueImage[0];
            
            console.log("*** BanqueImage modifié avec succès");

            res.status(200).json(resSqlUpdateBanqueImage);

        } catch (err) {
            console.log("erreur dans la requête", err.message);
            res.status(500).json({ message: "erreur dans la requête" });
        }
    } else {
        res.status(401).json({
            message: "Vous n'êtes pas autorisé à modifier des images dans la Banque Images, veuillez demander les droits",
        });
    }
};


//DELETE one image from BanqueImages
exports.deleteOneImage = async (req, res, next) => {
    console.log("***Bienvenue dans deleteOneImage***");

    let idParams = parseInt(req.params.id);
    console.log("***idImage", idParams);

    if (req.auth.role === "Admin" || req.auth.role === "User") {
        try {
            let resDeleteOneImage = await DB.query(`DELETE FROM BanqueImages WHERE id = ?`, idParams);
            
            resDeleteOneImage = resDeleteOneImage[0];
            
            console.log("*** BanqueImage supprimé avec succès");

            res.status(200).json(resDeleteOneImage);
        } catch (err) {
            console.log("erreur dans la requête", err.message);
            res.status(500).json({ message: "erreur dans la requête" });
        }
    } else {
        res.status(401).json({
            message: "Vous n'êtes pas autorisé à supprimer des images dans la Banque Images, veuillez demander les droits",
        });
    }
};


