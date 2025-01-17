// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Pour séparer les responsabilités et faciliter la gestion des connexions.
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : En utilisant des fonctions pour ouvrir et fermer les connexions.

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

  function connectMongo() {
  // TODO: Implémenter la connexion MongoDB

  mongoClient = new MongoClient(config.mongodb.uri);
  try {
     mongoClient.connect();
    db = mongoClient.db(config.mongodb.dbName);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("not connected from bd.js");
  }
  // Gérer les erreurs et les retries     

}


async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  const redisClient = redis.createClient();
  try {
    await redisClient.connect({
      host: config.redis, port: config.port
    });
    console.log("data base connected");
  } catch (error) {
    console.log("data base not connected");
  }
  return redisClient;
}
function getdb() {
  connectMongo()
  if ((!db)) {
    console.log("mongodb not found not connected")
  } else {
    return db;
  }
}
// close connections
async function closeMongo() {
  await mongoClient.close();
  console.log("MongoDB connection closed");
}
async function closeRedis() {
  await redisClient.quit();
  console.log("Redis connection closed");
}

// Export des fonctions et clients
module.exports = {
  connectMongo,
  connectRedis,
  getdb,
  closeMongo,
  closeRedis,

};