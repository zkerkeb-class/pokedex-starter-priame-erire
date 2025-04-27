const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        english: {
            type: String,
            required: true
        },
        japanese: {
            type: String,
            required: true
        },
        chinese: {
            type: String,
            required: true
        },
        french: {
            type: String,
            required: true
        }
    },
    type: {
        type: [String], // Tableau de types (ex: ["Grass", "Poison"])
        required: true
    },
    base: {
        HP: {
            type: Number,
            required: true
        },
        Attack: {
            type: Number,
            required: true
        },
        Defense: {
            type: Number,
            required: true
        },
        Sp_Attack: {
            type: Number,
            required: true
        },
        Sp_Defense: {
            type: Number,
            required: true
        },
        Speed: {
            type: Number,
            required: true
        }
    }
}, { collection: 'pokemons' }); // Nom de la collection MongoDB

module.exports = mongoose.model('Pokemon', PokemonSchema);
