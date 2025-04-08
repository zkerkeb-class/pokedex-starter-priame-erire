// Importation 
import React, { useEffect,useState } from 'react';
// import api from './../../services/api';
import './Home.css';
// import pokemons from '../../assets/pokemons'
import PokemonCard from '../../components/pokemonCard';
// import AllPokemonsList from '../../components/AllPokemonAPI';
//components\AllPokemonAPI\AllPokemonsList.js
import SearchBar from '../../components/SearchBar';
import {getAllPokemons} from '../../services/api';


// src\services\api.js
// Allow all origins, or configure specific ones

/// AIDE https://www.digitalocean.com/community/tutorials/react-axios-react#step-1-adding-axios-to-the-project

const liste = [];
console.log("Dis mois si tu passe par ici Home");

function Home() {
  const [pokemons, setPokemons] = useState([])
// useState does not take an initial value ''.n

// Use to hold pokemon Name
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
// Use to hold pokemon Type
 const [searchType, setSearchType] = useState([]); // State to store search type

// pokemon from API
const getPokemonFromApi = async () =>{
  const response = await getAllPokemons()
  console.log(response) 

  setPokemons(response)

}

useEffect(()=> {
  getPokemonFromApi()
},[]) 

useEffect(() => {
  console.log('search term is ',searchTerm)
  console.log('types', searchType)
}, [searchTerm, searchType])


// issue because the type is array
  return (
    <div className="App">
    <div className="SearchBarFX"> 
    <SearchBar types={searchType} setTypes={setSearchType} search={searchTerm} setSearch={setSearchTerm}/>
    </div>
    
    <div className="pokemon-list">
      {pokemons.map((pokemon) => {
        console.log(pokemon)
        const isTypeIncluded = searchType.length === 0 || searchType.every(type => pokemon.type.includes(searchType))
        const isNameIncluded = searchTerm === "" || pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase())

        if(!isNameIncluded || !isTypeIncluded){
          return null
        }
        return (
            
            <div key={pokemon.id} className="pokemon-card-container">
              <PokemonCard
                nameFrench={pokemon.name?.french}
                nameEnglish={pokemon.name?.english}
                types={pokemon.type}
                image={pokemon.image}
                spAttack={pokemon.base.Attack}
                spDefense={pokemon.base.Defense}
                baseSpeed={pokemon.base.Speed}
                id={pokemon._id} //id={pokemon._id}
                imageShinny={pokemon.imageShiny}
              />
            </div>
          )
      })}
      </div>
    </div>
  )
}
export default Home;
