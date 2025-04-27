import { createPokemon } from '../../services/api';
import './Create.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


const Create = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: {
      english: '',
      japanese: '',
      chinese: '',
      french: ''
    },
    type: [''],
    base: {
      HP: '',
      Attack: '',
      Defense: '',
      'Sp_Attack': '',
      'Sp_Defense': '',
      Speed: ''
    },
    image: ''
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

// come back to the Home Page
  const returnHome = () => {
    console.log("Comeback home ");
    navigate(`/`);
};

  // Field validation function
  const validateForm = () => {
    const newErrors = {};
    
    // ID validation
    if (!formData.id) {
      newErrors.id = "ID is required";
    } else if (formData.id <= 0) {
      newErrors.id = "ID must be a positive number";
    }
    
    // Name validation
    if (!formData.name.english) {
      newErrors.nameEnglish = "English name is required";
    }
    
    // Type validation
    if (!formData.type[0]) {
      newErrors.type = "At least one type is required";
    }
    
    // Base stats validation
    Object.keys(formData.base).forEach(stat => {
      const value = formData.base[stat];
      if (!value && value !== 0) {
        newErrors[`base_${stat}`] = `${stat} is required`;
      } else if (isNaN(value) || value < 1 || value > 255) {
        newErrors[`base_${stat}`] = `${stat} must be between 1 and 255`;
      }
    });
    
    // Image URL validation
    if (!formData.image) {
      newErrors.image = "Image URL is required";
    } else if (!formData.image.match(/^(http|https):\/\/.*$/)) {
      newErrors.image = "Please enter a valid URL starting with http:// or https://";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e, field, subfield = null) => {
    if (subfield) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [subfield]: e.target.value
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: e.target.value
      });
    }
  };

  const handleTypeChange = (e, index) => {
    const newTypes = [...formData.type];
    newTypes[index] = e.target.value;
    setFormData({
      ...formData,
      type: newTypes
    });
  };

  const addTypeField = () => {
    setFormData({
      ...formData,
      type: [...formData.type, '']
    });
  };

  const removeTypeField = (index) => {
    const newTypes = formData.type.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      type: newTypes
    });
  };

  const handleBaseStatChange = (e, stat) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      base: {
        ...formData.base,
        [stat]: value
      }
    });
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: { english: '', japanese: '', chinese: '', french: '' },
      type: [''],
      base: {
        HP: '',
        Attack: '',
        Defense: '',
        'Sp_Attack': '',
        'Sp_Defense': '',
        Speed: ''
      },
      image: ''
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setMessage({ 
        text: "Please fix the errors in the form before submitting", 
        isError: true 
      });
      return;
    }
    
    setIsLoading(true);
    
    // Convert string values to numbers for appropriate fields
    const processedData = {
      ...formData,
      id: parseInt(formData.id),
      base: {
        HP: parseInt(formData.base.HP),
        Attack: parseInt(formData.base.Attack),
        Defense: parseInt(formData.base.Defense),
        'Sp_Attack': parseInt(formData.base['Sp_Attack']),
        'Sp_Defense': parseInt(formData.base['Sp_Defense']),
        Speed: parseInt(formData.base.Speed)
      }
    };

    try {
      // Use the createPokemon function from API service
      const newPokemon = await createPokemon(processedData);
      setMessage({ 
        text: `Pokémon added successfully! MongoDB assigned _id: ${newPokemon._id}`, 
        isError: false 
      });
      // Reset form
      resetForm();
    } catch (error) {
      setMessage({ 
        text: `Error: ${error.response?.data?.message || error.message}`, 
        isError: true 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', isError: false });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Define type colors for visual representation
  const typeColors = {
    'Normal': 'bg-gray-300',
    'Fire': 'bg-red-500',
    'Water': 'bg-blue-500',
    'Electric': 'bg-yellow-400',
    'Grass': 'bg-green-500',
    'Ice': 'bg-blue-200',
    'Fighting': 'bg-red-700',
    'Poison': 'bg-purple-500',
    'Ground': 'bg-yellow-600',
    'Flying': 'bg-indigo-300',
    'Psychic': 'bg-pink-500',
    'Bug': 'bg-green-600',
    'Rock': 'bg-yellow-700',
    'Ghost': 'bg-purple-700',
    'Dragon': 'bg-indigo-600',
    'Dark': 'bg-gray-800',
    'Steel': 'bg-gray-400',
    'Fairy': 'bg-pink-300'
  };

  // Determine preview badge color based on type input
  const getTypeBadgeColor = (type) => {
    const matchedType = Object.keys(typeColors).find(t => 
      type.toLowerCase() === t.toLowerCase()
    );
    return matchedType ? typeColors[matchedType] : 'bg-gray-200';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Add New Pokémon</h1>
      
      {message.text && (
        <div 
          className={`p-4 mb-6 rounded-md ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} transition-opacity duration-500 ease-in-out`}
        >
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Pokémon ID and Preview Section */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pokémon ID</label>
            <input
              type="number"
              value={formData.id}
              onChange={(e) => handleChange(e, 'id')}
              className={`block w-full rounded-md border ${errors.id ? 'border-red-500' : 'border-gray-300'} shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
              required
              min="1"
            />
            {errors.id && (
              <p className="mt-1 text-sm text-red-600">{errors.id}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Enter the numeric ID for this Pokémon (e.g., 152). The MongoDB _id will be generated automatically.
            </p>
          </div>
          
          <div className="w-full md:w-1/3 bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md">
            <div className="text-center">
              <h3 className="font-bold mb-2">Preview</h3>
              <div className="h-24 w-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-2 border-2 border-gray-300 overflow-hidden">
                {formData.image ? (
                  <img src="/api/placeholder/96/96" alt="Pokemon preview" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-gray-400 text-xs">No image</span>
                )}
              </div>
              <div className="font-bold">{formData.name.english || "New Pokémon"}</div>
              <div className="flex gap-2 justify-center mt-2 flex-wrap">
                {formData.type.filter(t => t).map((type, idx) => (
                  <span key={idx} className={`${getTypeBadgeColor(type)} text-white text-xs px-2 py-1 rounded transition-colors`}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Name Translations Section */}
        <div className="bg-gray-50 p-5 rounded-lg transition-all duration-300 hover:shadow-md">
          <h2 className="font-semibold text-lg mb-4 text-blue-600">Name Translations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData.name).map((lang) => (
              <div key={lang} className="mb-3">
                <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                  {lang} {lang === 'english' && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  value={formData.name[lang]}
                  onChange={(e) => handleChange(e, 'name', lang)}
                  className={`block w-full rounded-md border ${
                    errors[`name${lang.charAt(0).toUpperCase() + lang.slice(1)}`] 
                      ? 'border-red-500' 
                      : 'border-gray-300'
                  } shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  required={lang === 'english'}
                />
                {errors[`name${lang.charAt(0).toUpperCase() + lang.slice(1)}`] && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors[`name${lang.charAt(0).toUpperCase() + lang.slice(1)}`]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Types Section */}
        <div className="bg-gray-50 p-5 rounded-lg transition-all duration-300 hover:shadow-md">
          <h2 className="font-semibold text-lg mb-4 text-blue-600">Types</h2>
          {formData.type.map((type, index) => (
            <div key={index} className="flex items-center mb-3">
              <input
                type="text"
                value={type}
                onChange={(e) => handleTypeChange(e, index)}
                className={`block w-full rounded-md border ${
                  index === 0 && errors.type ? 'border-red-500' : 'border-gray-300'
                } shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                placeholder="e.g., Grass, Fire, Water"
                required={index === 0}
                list="pokemon-types"
              />
              <datalist id="pokemon-types">
                {Object.keys(typeColors).map(type => (
                  <option key={type} value={type} />
                ))}
              </datalist>
              {formData.type.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTypeField(index)}
                  className="ml-2 p-2 text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Remove type"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          {/* Fix for the index error - this is properly scoped now */}
          {errors.type && (
            <p className="mt-1 mb-2 text-sm text-red-600">{errors.type}</p>
          )}
          {formData.type.length < 2 && (
            <button
              type="button"
              onClick={addTypeField}
              className="mt-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200 transition-colors"
            >
              Add Second Type
            </button>
          )}
        </div>

        {/* Base Stats Section */}
        <div className="bg-gray-50 p-5 rounded-lg transition-all duration-300 hover:shadow-md">
          <h2 className="font-semibold text-lg mb-4 text-blue-600">Base Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {Object.keys(formData.base).map((stat) => (
              <div key={stat}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {stat} <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={formData.base[stat]}
                    onChange={(e) => handleBaseStatChange(e, stat)}
                    className={`block w-full rounded-md border ${
                      errors[`base_${stat}`] ? 'border-red-500' : 'border-gray-300'
                    } shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    min="1"
                    max="255"
                    required
                  />
                  <div className="ml-2 w-10 text-center font-bold">
                    {formData.base[stat] ? formData.base[stat] : "-"}
                  </div>
                </div>
                {errors[`base_${stat}`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`base_${stat}`]}</p>
                )}
                {formData.base[stat] && (
                  <div className="mt-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        parseInt(formData.base[stat]) < 50 ? 'bg-red-500' : 
                        parseInt(formData.base[stat]) < 100 ? 'bg-yellow-500' :
                        parseInt(formData.base[stat]) < 150 ? 'bg-blue-500' : 'bg-green-600'
                      }`}
                      style={{ width: `${Math.min(100, (parseInt(formData.base[stat]) / 255) * 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Image URL Section */}
        <div className="bg-gray-50 p-5 rounded-lg transition-all duration-300 hover:shadow-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => handleChange(e, 'image')}
            className={`block w-full rounded-md border ${
              errors.image ? 'border-red-500' : 'border-gray-300'
            } shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
            placeholder="http://localhost:5173/assets/pokemons/1.png"
            required
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Enter a valid URL for the Pokémon image
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={resetForm}
            className="w-1/3 py-3 px-6 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-2/3 py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
              isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
          >
            {isLoading ? 'Adding...' : 'Add Pokémon'}
          </button>
          <button
            type="button"
            onClick={returnHome}
            className="w-1/3 py-3 px-6 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Come back to the Home page
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;