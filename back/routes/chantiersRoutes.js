/****importation des modules nécessaires */
const express = require("express");
const router = express.Router(); 
 
//importation du controller
const chantiersController = require('../controllers/chantiersController');
//importation du middleware de connexion
const auth = require('../midleWares/auth');

//impportation des routes

router.post("/add/:id", auth, chantiersController.createChantier); 
router.delete("/:id", auth, chantiersController.deleteChantier);
router.put("/:id" ,auth, chantiersController.updateChantier);
router.get("/getAll", auth, chantiersController.getAllChantiers);
router.get("/:id", auth, chantiersController.getOneChantier);  



//exportation des routes
module.exports = router;    