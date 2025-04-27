import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  id: Number,
  name: {
    english: String,
    japanese: String,
    chinese: String,
    french: String
  },
  type: [String],
  base: {
    HP: Number,
    Attack: Number,
    Defense: Number,
    "Sp. Attack": Number,
    "Sp. Defense": Number,
    Speed: Number
  },
  image: String,
  imageShiny: String
}

, {
  timestamps: true
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

export default Pokemon;
