// Question: Pourquoi créer des services séparés ?
// Réponse: Pour réutiliser la logique métier et séparer les responsabilités.

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  //Implémenter une fonction générique de recherche par ID
  return db.collection(collection).findOne({ _id: ObjectId(id) });
   
}

// Export des services
module.exports = {
  //Exporter les fonctions utilitaires
  findOneById
};