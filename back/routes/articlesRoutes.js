 /****importation des modules nécessaires */
const express = require("express");
const router = express.Router(); 
const multer = require('../midleWares/multer-config');
 
//importation du controller
const articlesController = require('../controllers/articlesController');
//importation du middleware de connexion
const auth = require('../midleWares/auth');

//impportation des routes

router.post("/add",  auth, multer, articlesController.createArticle); 
router.delete("/:id", auth, multer,  articlesController.deleteArticle);
router.put("/:id" ,auth, multer,  articlesController.updateArticle);
router.get("/getAll", articlesController.getAllArticles);
router.get("/:id", articlesController.getOneArticle);  



//exportation des routes
module.exports = router;    