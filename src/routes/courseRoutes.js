// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Pour organiser et structurer le code de manière modulaire.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: En regroupant les routes par fonctionnalité ou ressource.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Définir les routes et les fonctions de rappel

router.post('/courses', courseController.createCourse);


module.exports = router;