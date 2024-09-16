/****importation des modules nécessaires */
const express = require("express");
const router = express.Router(); 
 
//importation du controller
const usersController = require('../controllers/usersController');
//importation du middleware de connexion
const auth = require('../midleWares/auth');

//impportation des routes
router.post("/login",  usersController.login); //pas besoin d'authentification pour se connecter
router.post("/signum",  usersController.signum); 

router.delete("/:id", auth, usersController.deleteUser);
router.put("/:id" ,auth, usersController.updateUser);
router.get("/getAll", auth, usersController.getAllUsers);
router.get("/:id", auth, usersController.getUser); 



//exportation des routes
module.exports = router;    