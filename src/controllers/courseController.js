// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Un contrôleur contient la logique métier tandis qu'une route définit les points d'entrée de l'API.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour rendre le code plus modulaire et facile à tester.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  try {
    const { title, description, duration } = req.body;
    const newCourse = {
      title,
      description,
      duration,
      createdAt: new Date()
    };

    // Utiliser les services pour la logique réutilisable
    const result = await mongoService.insertOne('courses', newCourse);
    await redisService.set(`course:${result.insertedId}`, JSON.stringify(newCourse));

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du cours', error });
  }
}

// Export des contrôleur
module.exports = {
  createCourse
};