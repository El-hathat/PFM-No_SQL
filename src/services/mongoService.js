// Question: Pourquoi créer des services séparés ?
// Réponse: Pour réutiliser la logique métier et séparer les responsabilités.

const { ObjectId } = require('mongodb');
const mongodb = require('../config/db');
const db = mongodb.getdb();
// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  //Implémenter une fonction générique de recherche par ID
  return db.collection(collection).findOne({ _id: ObjectId(id) });
   
}
// creetion de la fonction insertOne
async function insertOne(collectionName, document) {
  
  const collection = dbInstance.collection(collectionName);
  return await collection.insertOne(document);
}

// creetion de la fonction deleteone
async function deleteOne(collection, id) {
  // Implémenter une fonction générique de suppression
  return db.collection(collection).deleteOne({ _id: ObjectId(id) });
}

// creetion de la fonction getAll
async function getAll(collection) {
  // Implémenter une fonction générique de recherche
  return db.collection(collection).find().toArray();
}

// Export des services
module.exports = {
  //Exporter les fonctions utilitaire
  findOneById,
  insertOne,
  deleteOne,
  getAll
};




