import React, { useEffect, useState } from 'react';
import './Home.css';
import PokemonCard from '../../components/pokemonCard';
import SearchBar from '../../components/SearchBar';
import { getAllPokemons } from '../../services/api';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPokemonFromApi = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPokemons();
      console.log("First Pokemon from API:", response[0]);
      setPokemons(response);
      setError(null);
    } catch (err) {
      console.error("Error fetching Pokemon:", err);
      setError("Failed to load Pokemon data");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPokemonFromApi();
  }, []);

  useEffect(() => {
    console.log('search term is ', searchTerm);
    console.log('types', searchType);
  }, [searchTerm, searchType]);

  if (isLoading) return <div className="loading">Loading Pokémon data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="App">
      <div className="SearchBarFX">
        <SearchBar 
          types={searchType} 
          setTypes={setSearchType} 
          search={searchTerm} 
          setSearch={setSearchTerm}
        />
      </div>
      
      <div className="pokemon-list">
        {pokemons.map((pokemon) => {
          // Safe check for name and type properties
          const pokemonName = pokemon.name?.french || pokemon.name?.english || `Pokemon #${pokemon.id}`;
          const pokemonTypes = Array.isArray(pokemon.type) ? pokemon.type : [];
          
          // Fixed search logic
          const isTypeIncluded = searchType.length === 0 || 
            pokemonTypes.some(type => searchType.includes(type));
          
          const isNameIncluded = searchTerm === "" || 
            pokemonName.toLowerCase().includes(searchTerm.toLowerCase());
          
          if (!isNameIncluded || !isTypeIncluded) {
            return null;
          }
          
          return (
            <div key={pokemon._id || pokemon.id} className="pokemon-card-container">
              <PokemonCard
                nameFrench={pokemon.name?.french || `Pokemon #${pokemon.id}`}
                nameEnglish={pokemon.name?.english || `Pokemon #${pokemon.id}`}
                types={pokemonTypes}
                image={pokemon.image}
                spAttack={pokemon.base?.Attack}
                spDefense={pokemon.base?.Defense}
                baseSpeed={pokemon.base?.Speed}
                id={pokemon._id || pokemon.id}
                imageShinny={pokemon.imageShiny}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;