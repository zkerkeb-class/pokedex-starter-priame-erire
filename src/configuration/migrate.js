const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Pokemon = require('./models/Pokemon'); // Correction du chemin

mongoose.connect('mongodb://localhost:27017/pokedex', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur de connexion MongoDB:', err));

// Vérifier si le fichier existe avant de le lire
const dataPath = path.join(__dirname, 'data.json');

if (!fs.existsSync(dataPath)) {
    console.error('erreur Fichier data.json introuvable');
    process.exit(1);
}

// Charger les données depuis le fichier JSON
const rawData = fs.readFileSync(dataPath);
const pokemons = JSON.parse(rawData);

const migrateData = async () => {
    try {
        await Pokemon.deleteMany(); // Supprime les anciennes données
        console.log('🔄 Anciennes données supprimées');

        await Pokemon.insertMany(pokemons); // Insère les nouvelles données
        console.log('✅ Migration terminée avec succès');

        mongoose.connection.close(); // Ferme la connexion
    } catch (error) {
        console.error(' Erreur lors de la migration:', error);
        mongoose.connection.close();
    }
};

// Lancer la migration
migrateData();
