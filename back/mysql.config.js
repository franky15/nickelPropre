// const mysql = require('mysql');
const mysql = require('mysql2/promise');


// Importation des variables d'environnement
require('dotenv').config();

// Création du pool de connexions à la base de données
const db = mysql.createPool({
  connectionLimit: 10,  // Limite du nombre de connexions dans le pool
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Gestion des événements pour capturer les erreurs
db.on('connection', (connection) => {
  console.log('Nouvelle connexion à la base de données établie.');

  // Optionnel : Vous pouvez exécuter des commandes initiales ici, par exemple `SET time_zone = '+00:00';`
});

db.on('error', (err) => {
  console.error('Erreur de la base de données:', err.message);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('La connexion a été perdue. Tentative de reconnexion...');
    // Ici, la reconnexion est automatiquement gérée par le pool
  } else {
    throw err;  // Lève l'erreur si ce n'est pas une erreur liée à la perte de connexion
  }
});

// Test de la connexion initiale
db.getConnection((err, connection) => {
  if (err) {
    console.error('Erreur de connexion au pool: ' + err.message);
  } else {
    connection.query(`SHOW TABLES`, (err, res) => {
      if (err) {
        console.error('Erreur dans la requête SHOW TABLES:', err.message);
      } else {
        console.log(`Connexion au pool de la base de données ${process.env.DB_DATABASE} réussie`);
      }
      connection.release();  // Libération de la connexion après l'utilisation
    });
  }
});

// Exportation du pool de connexions à la base de données
module.exports = db;