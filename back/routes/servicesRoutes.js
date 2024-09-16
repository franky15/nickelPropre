/****importation des modules nécessaires */
const express = require("express");
const router = express.Router(); 
const multer = require('../midleWares/multer-config');
 
//importation du controller
const servicesController = require('../controllers/servicesController');
//importation du middleware de connexion
const auth = require('../midleWares/auth');

//impportation des routes

router.post("/add", auth, multer,  servicesController.createService); 
router.delete("/:id", auth, multer,  servicesController.deleteService);
router.put("/:id" ,auth, multer,  servicesController.updateService);
router.get("/getAll", servicesController.getAllServices);
router.get("/:id", servicesController.getOneService);  



//exportation des routes
module.exports = router;    