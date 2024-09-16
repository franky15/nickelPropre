 /****importation des modules nécessaires */
 const express = require("express");
 const router = express.Router(); 
 const multer = require('../midleWares/multer-config');
  
 //importation du controller
 const banqueImagesController = require('../controllers/BanqueImagesController');
 //importation du middleware de connexion
 const auth = require('../midleWares/auth');
 
 //impportation des routes
 
 router.post("/add",  auth, multer,  banqueImagesController.createImage); 
 router.delete("/:id", auth, multer,  banqueImagesController.deleteOneImage);
 router.put("/:id" ,auth, multer,  banqueImagesController.updateOneImage);
 router.get("/getAll", banqueImagesController.getAllImages);
 router.get("/:id", banqueImagesController.getOneImage);  
 
 
 
 //exportation des routes
 module.exports = router;    