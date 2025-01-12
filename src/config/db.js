// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Pour séparer les responsabilités et faciliter la gestion des connexions.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : En utilisant des fonctions pour ouvrir et fermer les connexions.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  //Implémenter la connexion MongoDB
  MongoClient.connect(config.MONGO_URI, { useUnifiedTopology: true })
    .then((client) => {
      mongoClient = client;
      db = client.db(config.MONGO_DB_NAME);
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB', err);
      process.exit(1);
    });

  // Gérer les erreurs et les retries
  mongoClient?.on('error', (err) => {
    console.error('MongoDB error', err);
    mongoClient.close();
  });
  mongoClient?.on('close', () => {
    console.log('MongoDB connection closed');
  });

}

async function connectRedis() {
  //Implémenter la connexion Redis
  redisClient = redis.createClient(config.REDIS_URI);
  redisClient?.on('error', (err) => {
    console.error('Redis error', err);
    redisClient.quit();
  });
  redisClient?.on('end', () => {
    console.log('Redis connection closed');
  });
    //Gérer les erreurs et les retries
    redisClient?.on('error', (err) => {
      console.error('Redis error', err);
      redisClient.quit();
    });
    redisClient?.on('end', () => {
      console.log('Redis connection closed');
    });

    
}

// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  mongoClient,
  redisClient,
  db
};