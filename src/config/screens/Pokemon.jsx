import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonById } from '../../services/api';
import './Pokemon.css'; // Import the CSS file
import { useNavigate } from 'react-router';
import { deletePokemon } from '../../services/api';

const Pokemon = () => {
    const navigate = useNavigate();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const editerLePokemon = () => {
        console.log("Editer le pokémon tant ", id);
        navigate(`/edit/${id}`);
    };
    
    const supprLePokemon = () => {
        console.log("Supprimer le pokémon ! ");
        deletePokemon(id);
        navigate('/'); // Navigate to home page after deletion
    };

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const data = await getPokemonById(id);
                setPokemon(data);
            } catch (err) {
                setError('Failed to load Pokemon data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    if (loading) return <div className="loading-container"><div className="loader"></div></div>;
    if (error) return <div className="error-container">{error}</div>;
    if (!pokemon) return <div className="not-found-container">Pokemon not found</div>;

    // Helper function to determine background color based on Pokemon type
    const getTypeColor = (type) => {
        const typeColors = {
            normal: '#A8A77A',
            fire: '#EE8130',
            water: '#6390F0',
            electric: '#F7D02C',
            grass: '#7AC74C',
            ice: '#96D9D6',
            fighting: '#C22E28',
            poison: '#A33EA1',
            ground: '#E2BF65',
            flying: '#A98FF3',
            psychic: '#F95587',
            bug: '#A6B91A',
            rock: '#B6A136',
            ghost: '#735797',
            dragon: '#6F35FC',
            dark: '#705746',    
            steel: '#B7B7CE',
            fairy: '#D685AD'
        };
        
        return typeColors[type.toLowerCase()] || '#777777';
    };

    return (
        <div className="pokemon-container">
            <div className="pokemon-card">
                <div className="pokemon-header">
                    <h1><span className='french-name'>({pokemon.name.french})</span>
                    <span className="english-name">({pokemon.name.english})</span></h1>
                    <div className="pokemon-types">
                        {pokemon.types && pokemon.types.length > 0 ? (
                        pokemon.types.map(typeObj => (
                        <span
                            key={typeObj.type}
                            className="type-badge"
                            style={{ backgroundColor: getTypeColor(typeObj.type) }}
                        >
                        {typeObj.type}
                        </span>
                        ))
                        ) : (
                        <span className="type-badge" style={{ backgroundColor: '#A8A878' }}>
                            unknown
                        </span>
                        )}
                    </div>
                </div>
                
                <div className="pokemon-content">
                    <div className="pokemon-images">
                        <div className="image-container">
                            <h3>Regular</h3>
                            <div className="image-wrapper">
                                <img src={pokemon.image} alt={pokemon.name.english} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="pokemon-details">
                        <div className="pokemon-stats">
                            <h2>Statistiques</h2>
                            <div className="stats-grid">
                                {Object.entries(pokemon.base).map(([stat, value]) => (
                                    <div key={stat} className="stat-bar">
                                        <div className="stat-label">{stat}</div>
                                        <div className="stat-bar-container">
                                            <div 
                                                className="stat-bar-fill" 
                                                style={{ 
                                                    width: `${(value / 255) * 100}%`,
                                                    backgroundColor: value > 150 ? '#4CAF50' : value > 100 ? '#2196F3' : value > 70 ? '#FFC107' : '#FF5722'
                                                }}
                                            ></div>
                                            <span className="stat-value">{value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="pokemon-names">
                            <h2>Noms dans d'autres langues</h2>
                            <div className="language-grid">
                                <div className="language-item">
                                    <span className="language-label">Japanese:</span>
                                    <span className="language-value">{pokemon.name.japanese}</span>
                                </div>
                                <div className="language-item">
                                    <span className="language-label">Chinese:</span>
                                    <span className="language-value">{pokemon.name.chinese}</span>
                                </div>
                            </div>
                        </div>

                        <div className="delete-button">
                            <h2>Fonctionnalités</h2>
                            
                            {!showDeleteConfirmation ? (
                                <div>
                                    <button 
                                        style={{ backgroundColor: 'red', color: 'white', marginRight: '10px' }}
                                        onClick={() => setShowDeleteConfirmation(true)}
                                    >
                                        Supprimer le pokémon
                                    </button>
                                    <button 
                                        style={{ backgroundColor: 'orange', color: 'white' }}
                                        onClick={() => editerLePokemon()}
                                    >
                                        Editer le pokémon
                                    </button>
                                </div>
                            ) : (
                                <div className="confirmation-panel" style={{ 
                                    border: '1px solid #ccc', 
                                    borderRadius: '5px',
                                    padding: '15px',
                                    backgroundColor: '#f9f9f9',
                                    marginTop: '10px'
                                }}>
                                    <h3 style={{ marginTop: '0' }}>Confirmer la suppression</h3>
                                    <p>
                                        Êtes-vous sûr de vouloir supprimer <strong>{pokemon.name.french}</strong> ?
                                    </p>
                                    <div>
                                        <button
                                            style={{ 
                                                backgroundColor: 'red', 
                                                color: 'white', 
                                                marginRight: '10px' 
                                            }}
                                            onClick={supprLePokemon}
                                        >
                                            Oui, supprimer
                                        </button>
                                        <button
                                            style={{ 
                                                backgroundColor: '#777', 
                                                color: 'white' 
                                            }}
                                            onClick={() => setShowDeleteConfirmation(false)}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pokemon;