// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Pour organiser et structurer le code de manière modulaire.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: En regroupant les routes par fonctionnalité ou ressource.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Définir les routes et les fonctions de rappel
router.post('/courses', courseController.createCourse);
router.get('/teste', courseController.teste);
router.get('/all', courseController.getAllCourses);

// Ajouter les routes pour findOneById et deleteOne
router.get('/courses/:id', courseController.findOneById);
router.delete('/courses/:id', courseController.deleteOne);

module.exports = router;