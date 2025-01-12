// Question: Comment organiser le point d'entrée de l'application ?
// Réponse : En regroupant les routes et les middlewares dans un seul fichier.
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse : En utilisant une fonction asynchrone pour initialiser les connexions et démarrer le serveur.
const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');


const app = express();

async function startServer() {
  try {
    // Initialiser les connexions aux bases de données
    await db.connectMongo();
    await db.connectRedis();

    //Configurer les middlewares Express
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    //Monter les routes
    app.use('/courses', courseRoutes);

    //Démarrer le serveur
    app.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  //Implémenter la fermeture propre des connexions
  await db.mongoClient.close();
  await db.redisClient.quit();
  console.log('Shutting down server');
  process.exit(0);
  
});

startServer();