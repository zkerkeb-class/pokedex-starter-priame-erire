import {getPokemonById} from '../../services/api';
import './Create.css';
import React, { useState } from 'react';
import axios from 'axios';
//http://localhost:5173/pokemon/67f3f72d1b032d324bc33079
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
          'Sp. Attack': '',
          'Sp. Defense': '',
          Speed: ''
        },
        image: ''
      });
    
      const [message, setMessage] = useState({ text: '', isError: false });
      const [isLoading, setIsLoading] = useState(false);
    
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
        setFormData({
          ...formData,
          base: {
            ...formData.base,
            [stat]: e.target.value
          }
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Convert string values to numbers for appropriate fields
        const processedData = {
          ...formData,
          id: parseInt(formData.id),
          base: {
            HP: parseInt(formData.base.HP),
            Attack: parseInt(formData.base.Attack),
            Defense: parseInt(formData.base.Defense),
            'Sp. Attack': parseInt(formData.base['Sp. Attack']),
            'Sp. Defense': parseInt(formData.base['Sp. Defense']),
            Speed: parseInt(formData.base.Speed)
          }
        };
    
        try {
          const response = await axios.post('/api/pokemons', processedData);
          setMessage({ 
            text: `Pokemon added successfully! MongoDB assigned _id: ${response.data._id}`, 
            isError: false 
          });
          // Reset form
          setFormData({
            id: '',
            name: { english: '', japanese: '', chinese: '', french: '' },
            type: [''],
            base: {
              HP: '',
              Attack: '',
              Defense: '',
              'Sp. Attack': '',
              'Sp. Defense': '',
              Speed: ''
            },
            image: ''
          });
        } catch (error) {
          setMessage({ 
            text: `Error: ${error.response?.data?.message || error.message}`, 
            isError: true 
          });
        } finally {
          setIsLoading(false);
        }
      };
    
      return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">Add New Pokémon</h1>
          
          {message.text && (
            <div className={`p-4 mb-4 rounded-md ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Pokémon ID</label>
              <input
                type="number"
                value={formData.id}
                onChange={(e) => handleChange(e, 'id')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter the numeric ID for this Pokémon (e.g., 152). The MongoDB _id will be generated automatically.
              </p>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="font-semibold text-lg mb-2">Name Translations</h2>
                
                {Object.keys(formData.name).map((lang) => (
                  <div key={lang} className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {lang}
                    </label>
                    <input
                      type="text"
                      value={formData.name[lang]}
                      onChange={(e) => handleChange(e, 'name', lang)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      required
                    />
                  </div>
                ))}
              </div>
    
              <div>
                <h2 className="font-semibold text-lg mb-2">Types</h2>
                {formData.type.map((type, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={type}
                      onChange={(e) => handleTypeChange(e, index)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      placeholder="e.g., Grass, Fire, Water"
                      required
                    />
                    {formData.type.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTypeField(index)}
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {formData.type.length < 2 && (
                  <button
                    type="button"
                    onClick={addTypeField}
                    className="mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm"
                  >
                    Add Type
                  </button>
                )}
              </div>
            </div>
    
            <div>
              <h2 className="font-semibold text-lg mb-2">Base Stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.keys(formData.base).map((stat) => (
                  <div key={stat}>
                    <label className="block text-sm font-medium text-gray-700">
                      {stat}
                    </label>
                    <input
                      type="number"
                      value={formData.base[stat]}
                      onChange={(e) => handleBaseStatChange(e, stat)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      min="1"
                      max="255"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
    
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => handleChange(e, 'image')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                placeholder="http://localhost:5173/assets/pokemons/152.png"
                required
              />
            </div>
    
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isLoading ? 'Adding...' : 'Add Pokémon'}
              </button>
            </div>
          </form>
        </div>
      );

}
export default Create