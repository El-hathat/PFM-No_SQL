// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse: Un contrôleur contient la logique métier tandis qu'une route définit les points d'entrée de l'API.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse : Pour rendre le code plus modulaire et facile à tester.

const { ObjectId } = require('mongodb');
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

    const result = await mongoService.insertOne('courses', newCourse);
    await redisService.set(`course:${result.insertedId}`, JSON.stringify(newCourse));
    console.log(result);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du cours', error });
  }
}

// Méthode pour retourner tous les cours
async function getAllCourses(req, res) {
  try {
    const courses = await mongoService.find('courses', {});
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des cours', error });
  }
}

// Méthode pour trouver un cours par ID
async function findOneById(req, res) {
  try {
    const { id } = req.params;
    const course = await mongoService.findOne('courses', { _id: ObjectId(id) });
    if (!course) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du cours', error });
  }
}

// Méthode pour supprimer un cours par ID
async function deleteOne(req, res) {
  try {
    const { id } = req.params;
    const result = await mongoService.deleteOne('courses', { _id: ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Cours non trouvé' });
    }
    await redisService.del(`course:${id}`);
    res.status(200).json({ message: 'Cours supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du cours', error });
  }
}

// Méthode de test
async function teste(req, res) {
  try {
    return res.status(200).json({ message: 'Teste' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du cours', error });
  }
}

// Export des contrôleurs
module.exports = {
  createCourse,
  getAllCourses,
  findOneById,
  deleteOne,
  teste
};