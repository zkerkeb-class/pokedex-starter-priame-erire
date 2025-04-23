import React, { useEffect, useState } from 'react';
import PokemonCard from '../../components/pokemonCard';
import SearchBar from '../../components/SearchBar';
import { getAllPokemons } from '../../services/api';
import './Home.css';
import { useNavigate } from 'react-router';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch pokemons from API
  const getPokemonFromApi = async () => {
    try {
      setLoading(true);
      const response = await getAllPokemons();
      console.log("Raw API response:", JSON.stringify(response[0], null, 2));
      setPokemons(response);
    } catch (err) {
      setError('Failed to load Pokemons');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createANewPokememon = () => {
    console.log("Ajouter un nouveau pokémon ");
    navigate(`/create/`);
    // navigate(`/edit/${id}`);
};
  useEffect(() => {
    getPokemonFromApi();
  }, []);

  useEffect(() => {
    console.log('search term is ', searchTerm);
    console.log('types', searchType);
  }, [searchTerm, searchType]);

  // Filter pokemons based on search criteria
  const filteredPokemons = pokemons.filter(pokemon => {
    const isTypeIncluded = searchType.length === 0 || 
      pokemon.type.some(type => searchType.includes(type));
    
    const isNameIncluded = searchTerm === "" || 
      (pokemon.name && pokemon.name.french && 
      pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return isNameIncluded && isTypeIncluded;
  });

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Ensemble des pokémons</h1>
        <p>Découvrez les pokémons</p>
        <p></p>
        <button 
          style={{ backgroundColor: 'orange', color: 'white', marginRight: '10px', textAlign: 'center', width: '150px',height:'100px'}} 
          onClick={() => createANewPokememon(true)}
          >
          Ajouter un nouveau pokémon
          </button>
      </header>

      <div className="search-container">
        <SearchBar 
          types={searchType} 
          setTypes={setSearchType} 
          search={searchTerm} 
          setSearch={setSearchTerm}
        />
        
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading Pokémon data...</p>
        </div>
      ) : error ? (
        <div className="error-container">{error}</div>
      ) : (
        <>
          <div className="results-info">
            <p>Found <span className="highlight">{filteredPokemons.length}</span> Pokémon</p>
          </div>
          
          <div className="pokemon-grid">
            {filteredPokemons.length > 0 ? (
              filteredPokemons.map((pokemon) => (
                <div key={pokemon.id} className="pokemon-card-wrapper">
                  <PokemonCard
                    nameFrench={pokemon.name?.french || `Pokemon #${pokemon.id}`}
                    nameEnglish={pokemon.name?.english || `Pokemon #${pokemon.id}`}
                    types={pokemon.type}
                    image={pokemon.image}
                    spAttack={pokemon.base?.["Sp_Attack"] || pokemon.base?.["Sp. Attack"] || pokemon.base?.Sp?.[" Attack"] || 0}
                    spDefense={pokemon.base?.["Sp_Defense"] || pokemon.base?.["Sp. Defense"] || pokemon.base?.Sp?.[" Defense"] || 0}
                    baseSpeed={pokemon.base?.Speed}
                    id={pokemon._id}
                  />
                </div>
              ))
            ) : (
              <div className="no-results">
                <h3>No Pokémon found</h3>
                <p>Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;