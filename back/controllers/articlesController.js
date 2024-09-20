//importation de la base de données
const moment = require('moment'); //permet de formater la date

const DB = require("../mysql.config");
const bcrypt = require("bcrypt");

const path = require("path");
const fs = require("fs");

//POST création d'un article
exports.createArticle = async (req, res, next) => {
    console.log("*** bienvenue dans createArticle ***");

    let role = req.auth.role;
    if (role !== 'Admin' && role !== 'User') {
        return res.status(401).json({ message: "Vous n'êtes pas autorisé à créer un article" });
    }

    let { title, contenu, auteur, category, alt_text } = req.body;
    
    let pictureformat;
    if (req.file !== undefined && req.file.filename !== undefined) {

        console.log("***req.file existe", req.file);
        //pictureformat = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        pictureformat = `${req.file.filename}`; // Stockage uniquement du nom du fichier tel qu'il est arrivé du front
    
    } 

    console.log("***pictureformat", pictureformat);

    let columns = ["title", "contenu", "auteur", "category", "Users_id"];
    let values = [title, contenu, auteur, category, req.auth.userId];
    
    
    const sqlInsertArticle = `INSERT INTO Articles (${columns.join(',')}) VALUES (${columns.map(() => '?').join(', ')})`;

    console.log("***sqlInsertArticle", sqlInsertArticle);

    try {
        let resSqlInsertArticle = await DB.query(sqlInsertArticle, values);
       
        resSqlInsertArticle = resSqlInsertArticle[0]; //permet récupérer l'objet métadonnées de la requête

        console.log("***resSqlInsertArticle", resSqlInsertArticle.insertId);

        console.log("*** Article créé avec succès");

        //création de l'image associée à l'article
        let columnsImage = ["Users_id", "Articles_id"];
        let valuesImage = [req.auth.userId, resSqlInsertArticle.insertId];
        
        if (alt_text) {
            columnsImage.push("alt_text");
            valuesImage.push(alt_text);
        }
        if (pictureformat) {
            columnsImage.push("file_path");
            valuesImage.push(pictureformat);
        }

        const sqlInsertBanqueImage = `INSERT INTO BanqueImages (${columnsImage.join(',')}) VALUES (${columnsImage.map(() => '?').join(', ')})`;
        const resSqlInsertBanqueImage = await DB.query(sqlInsertBanqueImage, valuesImage);
        
        res.status(200).json({ message: "Article et image créés avec succès", resSqlInsertBanqueImage });
    } catch (err) {
        console.error("Erreur lors de la création de l'article :", err);
        res.status(500).json({ message: "Erreur lors de la création de l'article", err });
    }
};


//GET récupération de tous les articles
exports.getAllArticles = async (req, res, next) => {
    console.log("*** bienvenue dans getAllArticles ***");

    //requette de récupération de tous les articles et des images associées
    /**
     *  récupération de toutes les colonnes de la table Articles et de la colonne file_path et alt_text de la table BanqueImages   SELECT Articles.*, BanqueImages.file_path, BanqueImages.alt_text 
     * jointure de (FROM) la table Articles avec (JOIN) la table BanqueImages en récupérant toutes les lignes du coté gauche (LEFT) c'est a dire de la table Articles même si pas de correspondance avec les lignes de BanqueImages selesctionnées  LEFT JOIN BanqueImages ON Articles.id = BanqueImages.Articles_id 
     * condition de jointure (ON) entre les deux tables sur la colonne id de la table Articles et la colonne Articles_id de la table BanqueImages
     * 
     * RIGHT JOIN récupère toutes les lignes de la table de droite même si pas de correspondance avec les lignes de la table de gauche (des images sans articles ne seront pas récupérées)
     * INNER JOIN récupère uniquement les lignes qui ont une correspondance dans les deux tables (des articles sans images ne seront pas récupérés)
     */
    const sqlSelectAllArticles = `SELECT Articles.*, BanqueImages.file_path, BanqueImages.alt_text  
     FROM Articles LEFT JOIN BanqueImages 
     ON Articles.id = BanqueImages.Articles_id`;

    try {
        const resSqlSelectAllArticles = await DB.query(sqlSelectAllArticles);
        console.log("*** Articles récupérés avec succès", resSqlSelectAllArticles);
        res.status(200).json({ resSqlSelectAllArticles });
    } catch (err) {
        console.log("erreur dans la requête", err.message);
        res.status(500).json({ message: "Erreur dans la requête" });
    }
};



//GET récupération d'un article
exports.getOneArticle = async (req, res, next) => {
    console.log("*** bienvenue dans getOneArticle ***");

    //récupération du paramètre id dans l'url et conversion en entier
    let idParams = parseInt(req.params.id);

    console.log("***idParams", idParams);

    //requette de récupération de tous les articles et des images associées
    /**
     * récupération de toutes les colonnes de la table Articles et de la colonne file_path et alt_text de la table BanqueImages   SELECT Articles.*, BanqueImages.file_path, BanqueImages.alt_text
     * jointure de (FROM) la table Articles avec (JOIN) la table BanqueImages en récupérant toutes les lignes du coté gauche (LEFT) c'est a dire de la table Articles même si pas de correspondance avec les lignes de BanqueImages selesctionnées  LEFT JOIN BanqueImages ON Articles.id = BanqueImages.Articles_id
     * condition de jointure (ON) entre les deux tables sur la colonne id de la table Articles et la colonne Articles_id de la table BanqueImages
     * condition de selection (WHERE) sur la colonne id de la table Articles
     * 
     * RIGHT JOIN récupère toutes les lignes de la table de droite même si pas de correspondance avec les lignes de la table de gauche (des images sans articles ne seront pas récupérées)
     * INNER JOIN récupère uniquement les lignes qui ont une correspondance dans les deux tables (des articles sans images ne seront pas récupérés)
     * 
     * condition de selection (WHERE) sur la colonne id de la table Articles
     */  
    const sqlSelectArticle = `SELECT Articles.*, BanqueImages.file_path, BanqueImages.alt_text
        FROM Articles LEFT JOIN BanqueImages
        ON Articles.id = BanqueImages.Articles_id
        WHERE Articles.id = ?`;

    try {
        let resSqlSelectArticle = await DB.query(sqlSelectArticle, [idParams]);
        
        resSqlSelectArticle = resSqlSelectArticle[0];

        if (resSqlSelectArticle.length === 0) {
            console.log("*** Aucun article trouvé");
            return res.status(404).json({ message: "Aucun article trouvé" });
        }

        

        console.log("*** Article récupéré avec succès", resSqlSelectArticle);
        res.status(200).json({ resSqlSelectArticle });
    } catch (err) {
        console.log("erreur dans la requête", err.message);
        res.status(500).json({ message: "Erreur dans la requête" });
    }
};





//DELETE suppression d'un article
exports.deleteArticle = async (req, res, next) => {
    console.log("*** bienvenue dans deleteArticle ***");

    let idParams = parseInt(req.params.id);

    console.log("***idParams", idParams);

    const sqlSelectArticle = `SELECT * FROM Articles LEFT JOIN BanqueImages ON Articles.id = BanqueImages.Articles_id WHERE Articles.id = ?`;

    try {
        let resSqlSelectArticle = await DB.query(sqlSelectArticle, [idParams]);

        resSqlSelectArticle = resSqlSelectArticle[0];

        if (resSqlSelectArticle.length === 0) {
            console.log("***Aucun article trouvé");
            return res.status(404).json({ message: "Aucun article trouvé" });
        }

        const article = resSqlSelectArticle[0];
        const imagePath = article.file_path;



        // Suppression de l'image du système de fichiers  associée à l'article 
        if (imagePath) {

            let imageName = imagePath;

            //vérification si le chemin stocké dans la base de données contient une URL complète, extraire uniquement le nom du fichier
            if (imagePath.includes('/')) {
                imageName = imagePath.split('/').pop(); // split sur le caractère '/' obtient un tableau et pop() récupère le dernier élément du tableau et le retourne qui est le nom du fichier
            }

            //construction du chemin complet du fichier image à supprimer qui est le chemin du dossier images + le nom du fichier image
            const fullImagePath = path.join('images', imageName);

            try {
                fs.unlinkSync(fullImagePath);
                console.log("Image supprimée avec succès");
            } catch (err) {
                console.log("Erreur lors de la suppression du fichier image", err);
                return res.status(500).json({ message: "Erreur lors de la suppression du fichier image" });
            }
        }

        // Suppression de l'article associé à l'image dans la base de données
        const sqlDeleteArticle = `DELETE Articles, BanqueImages 
                                  FROM Articles 
                                  LEFT JOIN BanqueImages 
                                  ON Articles.id = BanqueImages.Articles_id 
                                  WHERE Articles.id = ?`;

        await DB.query(sqlDeleteArticle, [idParams]);
        console.log("*** Article supprimé avec succès");
        res.status(200).json({ message: "Article et image supprimés avec succès" });
    } catch (err) {
        console.log("Erreur dans la requête de suppression", err.message);
        res.status(500).json({ message: "Erreur dans la requête de suppression", err });
    }
}; 







//PUT modification d'un article

exports.updateArticle = async (req, res, next) => {
    console.log("*** bienvenue dans updateArticle ***");

    let idParams = parseInt(req.params.id);

    console.log("***idParams", idParams);

    let { title, contenu, auteur, category } = req.body;
    
    let pictureformat;
    if (req.file !== undefined && req.file.filename !== undefined) {
        console.log("***req.file existe", req.file);
        pictureformat = `${req.file.filename}`; // Stocker uniquement le nom du fichier
    } 

    console.log("***pictureformat", pictureformat);

    const columns = ["title", "contenu", "auteur", "category"];
    const values = [title, contenu, auteur, category];

    if (pictureformat) {
        columns.push("file_path");
        values.push(pictureformat);
    }


    const sqlSelectArticle = `SELECT * FROM Articles LEFT JOIN BanqueImages 
                              ON Articles.id = BanqueImages.Articles_id 
                              WHERE Articles.id = ?`;

    const sqlUpdateArticle = `UPDATE Articles, BanqueImages 
                              SET ${columns.map((col) => `${col} = ?`).join(', ')} 
                              WHERE Articles.id = ? 
                              AND BanqueImages.Articles_id = ?`;


    try {
        let resSqlSelectArticle = await DB.query(sqlSelectArticle, [idParams]);

        resSqlSelectArticle = resSqlSelectArticle[0];
        
        console.log("***resSqlSelectArticle", resSqlSelectArticle);

        if (resSqlSelectArticle.length === 0) {
            console.log("*** Aucun article trouvé");
            return res.status(404).json({ message: "Aucun article trouvé" });
        }

        const article = resSqlSelectArticle[0];
        const oldImagePath = article.file_path;

        // Suppression de l'ancienne image physique si une nouvelle image a été téléchargée
        if (req.file && oldImagePath) {
            try {
                
                let imageName = oldImagePath;

                //vérification si le chemin stocké dans la base de données contient une URL complète, extraire uniquement le nom du fichier
                if (oldImagePath.includes('/')) {
                    imageName = oldImagePath.split('/').pop(); // split sur le caractère '/' obtient un tableau et pop() récupère le dernier élément du tableau et le retourne qui est le nom du fichier
                }
                
                //construction du chemin complet de l'image à supprimer qui est le chemin du dossier images + le nom du fichier image
                const fullImagePath = path.join('images', imageName);
                fs.unlinkSync(fullImagePath);

                console.log("Ancienne image supprimée avec succès");

            } catch (err) {
                console.log("Erreur lors de la suppression de l'ancienne image", err);
                return res.status(500).json({ message: "Erreur lors de la suppression de l'ancienne image" });
            }
        }

        // Mise à jour de l'article et de l'image associée
        await DB.query(sqlUpdateArticle, [...values, idParams, idParams]);
       
        console.log("*** Article mis à jour avec succès");
        
        res.status(200).json({ message: "Article mis à jour avec succès" });
    
    } catch (err) {
        console.log("Erreur dans la requête de mise à jour", err.message);
        res.status(500).json({ message: "Erreur dans la requête de mise à jour" });
    }
};
