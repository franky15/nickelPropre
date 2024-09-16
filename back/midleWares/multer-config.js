// Initiation de multer pour la gestion des images

const multer = require('multer');

//dictionnaire des types de fichiers
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/svg': 'svg',
  'image/gif': 'gif',

};

/*configuration de multer pour enregistrer les images grace à sa méthode diskStorage qui prend un objet de configuration
permettant d'obtenir le chemin d'enregistrement et le nom de fichier pour les fichiers entrants
*/

//NB: null est pour dire qu'il n'y a pas d'erreur
const storage = multer.diskStorage({

    //destination de l'enregistrement des fichiers
  destination: (req, file, callback) => {

    callback(null, 'images'); //dès qu'on recoit la requête puis le fichier on passe à la callback qui va enregistrer le fichier dans le dossier images
  
  },

  /* après que le fichier est enregistré dans dossier images
   il faut maintenant le renommer pour avoir un nom du fichier unique  et ajout de l'extension
  */
  filename: (req, file, callback) => {

    
    const extension = MIME_TYPES[file.mimetype];  //récupération de l'extension du fichier ici on a mis les [] pour que le js comprenne que c'est une variable
    
    if (!extension) {
      // Si l'extension n'est pas supportée, on renvoie une erreur
      return callback(new Error('Type de fichier non supporté'));
    }

    const name = file.originalname.split(' ').join('_');
    callback(null, name + Date.now() + '.' + extension);  //on termine toujours par la callback
 
  }

});

module.exports = multer({storage: storage}).single('picture');