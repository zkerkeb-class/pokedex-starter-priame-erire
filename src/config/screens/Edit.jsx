import './Edit.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonById, updatePokemon } from '../../services/api';
import './Pokemon.css'; // We'll reuse the Pokemon CSS




//http://localhost:5173/pokemon/67f3f72d1b032d324bc33079
const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: {
            english: '',
            french: '',
            japanese: '',
            chinese: ''
        },
        type: [],
        base: {
            HP: 0,
            Attack: 0,
            Defense: 0,
            "Sp_Attack": 0,
            "Sp_Defense": 0,
            Speed: 0
        },
        image: ''
    });

    // Available Pokemon types
    const availableTypes = [
        "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting",
        "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock",
        "Ghost", "Dragon", "Dark", "Steel", "Fairy"
    ];

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true);
                const data = await getPokemonById(id);
                
                // Transform the data to match our form structure
                const transformedData = {
                    ...data,
                    base: {
                        ...data.base,
                        // Handle different field naming conventions
                        "Sp_Attack": data.base["Sp_Attack"] || data.base["Sp. Attack"] || 
                                    (data.base.Sp && data.base.Sp[" Attack"]) || 0,
                        "Sp_Defense": data.base["Sp_Defense"] || data.base["Sp. Defense"] || 
                                    (data.base.Sp && data.base.Sp[" Defense"]) || 0
                    }
                };
                
                setFormData(transformedData);
            } catch (err) {
                setError('Failed to load Pokemon data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    const handleNameChange = (e, language) => {
        setFormData({
            ...formData,
            name: {
                ...formData.name,
                [language]: e.target.value
            }
        });
    };

    const handleBaseStatChange = (e, stat) => {
        const value = parseInt(e.target.value) || 0;
        setFormData({
            ...formData,
            base: {
                ...formData.base,
                [stat]: value
            }
        });
    };

    const handleTypeToggle = (type) => {
        const currentTypes = [...formData.type];
        if (currentTypes.includes(type)) {
            // Remove type if already selected
            setFormData({
                ...formData,
                type: currentTypes.filter(t => t !== type)
            });
        } else {
            // Add type if not already selected
            setFormData({
                ...formData,
                type: [...currentTypes, type]
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePokemon(id, formData);
            navigate(`/pokemon/${id}`);
        } catch (err) {
            setError('Failed to update Pokemon');
            console.error(err);
        }
    };

    const cancelEdit = () => {
        navigate(`/pokemon/${id}`);
    };

    if (loading) return <div className="loading-container"><div className="loader"></div></div>;
    if (error) return <div className="error-container">{error}</div>;

    return (
        <div className="pokemon-container">
            <div className="pokemon-card">
                <div className="pokemon-header">
                    <button 
                        style={{ backgroundColor: '#2980b9', color: 'white', textAlign: 'left' }}
                        onClick={cancelEdit}
                    >
                        Annuler
                    </button>
                    <h1>Éditer le pokémon</h1>
                </div>
                
                <div className="pokemon-content">
                    <form onSubmit={handleSubmit} className="edit-form">
                        <div className="form-section">
                            <h2>Noms</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="name-french">Nom français</label>
                                    <input 
                                        id="name-french"
                                        type="text"
                                        value={formData.name.french || ''}
                                        onChange={(e) => handleNameChange(e, 'french')}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name-english">Nom anglais</label>
                                    <input 
                                        id="name-english"
                                        type="text"
                                        value={formData.name.english || ''}
                                        onChange={(e) => handleNameChange(e, 'english')}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name-japanese">Nom japonais</label>
                                    <input 
                                        id="name-japanese"
                                        type="text"
                                        value={formData.name.japanese || ''}
                                        onChange={(e) => handleNameChange(e, 'japanese')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name-chinese">Nom chinois</label>
                                    <input 
                                        id="name-chinese"
                                        type="text"
                                        value={formData.name.chinese || ''}
                                        onChange={(e) => handleNameChange(e, 'chinese')}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Types</h2>
                            <div className="type-selector">
                                {availableTypes.map(type => (
                                    <div key={type} className="type-option">
                                        <input 
                                            type="checkbox" 
                                            id={`type-${type}`} 
                                            checked={formData.type.includes(type)}
                                            onChange={() => handleTypeToggle(type)}
                                        />
                                        <label htmlFor={`type-${type}`}>
                                            <span 
                                                className="type-badge"
                                                style={{ 
                                                    backgroundColor: {
                                                        Normal: '#A8A77A',
                                                        Fire: '#EE8130',
                                                        Water: '#6390F0',
                                                        Electric: '#F7D02C',
                                                        Grass: '#7AC74C',
                                                        Ice: '#96D9D6',
                                                        Fighting: '#C22E28',
                                                        Poison: '#A33EA1',
                                                        Ground: '#E2BF65',
                                                        Flying: '#A98FF3',
                                                        Psychic: '#F95587',
                                                        Bug: '#A6B91A',
                                                        Rock: '#B6A136',
                                                        Ghost: '#735797',
                                                        Dragon: '#6F35FC',
                                                        Dark: '#705746',    
                                                        Steel: '#B7B7CE',
                                                        Fairy: '#D685AD'
                                                    }[type] || '#777777'
                                                }}
                                            >
                                                {type}
                                            </span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Statistiques</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="stat-hp">HP</label>
                                    <input 
                                        id="stat-hp"
                                        type="number" 
                                        min="1" 
                                        max="255"
                                        value={formData.base.HP}
                                        onChange={(e) => handleBaseStatChange(e, 'HP')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stat-attack">Attack</label>
                                    <input 
                                        id="stat-attack"
                                        type="number" 
                                        min="1" 
                                        max="255"
                                        value={formData.base.Attack}
                                        onChange={(e) => handleBaseStatChange(e, 'Attack')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stat-defense">Defense</label>
                                    <input 
                                        id="stat-defense"
                                        type="number" 
                                        min="1" 
                                        max="255"
                                        value={formData.base.Defense}
                                        onChange={(e) => handleBaseStatChange(e, 'Defense')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stat-spattack">Sp. Attack</label>
                                    <input 
                                        id="stat-spattack"
                                        type="number" 
                                        min="1" 
                                        max="255"
                                        value={formData.base["Sp_Attack"]}
                                        onChange={(e) => handleBaseStatChange(e, 'Sp_Attack')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stat-spdefense">Sp. Defense</label>
                                    <input 
                                        id="stat-spdefense"
                                        type="number" 
                                        min="1" 
                                        max="255"
                                        value={formData.base["Sp_Defense"]}
                                        onChange={(e) => handleBaseStatChange(e, 'Sp_Defense')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="stat-speed">Speed</label>
                                    <input 
                                        id="stat-speed"
                                        type="number" 
                                        min="1" 
                                        max="255"
                                        value={formData.base.Speed}
                                        onChange={(e) => handleBaseStatChange(e, 'Speed')}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <h2>Image</h2>
                            <div className="form-group">
                                <label htmlFor="image-url">URL de l'image</label>
                                <input 
                                    id="image-url"
                                    type="text"
                                    value={formData.image || ''}
                                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                                />
                            </div>
                            {formData.image && (
                                <div className="image-preview">
                                    <h4>Aperçu</h4>
                                    <img src={formData.image} alt="Aperçu du Pokemon" style={{maxWidth: '200px'}} />
                                </div>
                            )}
                        </div>

                        <div className="form-actions">
                            <button 
                                type="button" 
                                onClick={cancelEdit}
                                style={{ backgroundColor: '#777', color: 'white', marginRight: '10px' }}
                            >
                                Annuler
                            </button>
                            <button 
                                type="submit"
                                style={{ backgroundColor: '#4CAF50', color: 'white' }}
                            >
                                Sauvegarder
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Edit