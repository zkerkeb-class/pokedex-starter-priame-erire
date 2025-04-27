import mongoose from 'mongoose';

const connectDB = async () => {
try {
    const options = {
      // Options de connexion recommandées
    socketTimeoutMS: 30000,
    connectTimeoutMS: 30000,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log(`MongoDB connecté: ${mongoose.connection.host}`);
} catch (error) {
    console.error(`Erreur de connexion à MongoDB: ${error.message}`);
    process.exit(1);
}
};

// Gestion des événements de connexion
mongoose.connection.on('disconnected', () => {
console.log('Déconnecté de MongoDB');
});

mongoose.connection.on('error', (err) => {
console.error(`Erreur MongoDB: ${err.message}`);
});

export default connectDB;
