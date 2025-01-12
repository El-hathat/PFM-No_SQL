// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse : En utilisant des fonctions utilitaires pour le cache.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser des clés explicites et uniques pour chaque donnée.

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
    //Implémenter une fonction générique de cache
    return redisClient.setex(key, ttl, JSON.stringify(data));

  }
  
  module.exports = {
    //Exporter les fonctions utilitaire
    cacheData
    
  };