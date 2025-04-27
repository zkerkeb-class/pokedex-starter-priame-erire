import './index.css'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';

const PokemonCard = ({nameFrench, nameEnglish, spAttack,spDefense,baseSpeed,image,types,id,imageShinny}) => {
    
    const navigate = useNavigate();
    const allerAuPokemon = () => {
        console.log(" Allons à id : ",id)
        navigate(`/pokemon/${id}`)
    }

    return(
        <div className="CaracteristicPokemonCard">
            <div className="pokemanimage">
                <img src={image} className="type de pokemon" alt="Image du pokémon" />
            </div>
            
            <div className="NomPokemon">
                <span>
                Nom français  : {nameFrench}
                <br></br>
                English Name : {nameEnglish}
                </span>
            </div>
            <div className="PointAtt">
                    SPattaque : {spAttack}
                    <br></br>
                    Pdefense : {spDefense}
                    <br></br>
                    baseSpeed : {baseSpeed}
            </div>
            <div className='AffichageTypes'>
                {types?.length > 0 ? (
                    types.map((type, index) => (
                        <span key={`${type}-${index}`} className="pokemon-type">
                            {type}{index < types.length - 1 ? ' ' : ''}
                        </span>
                    ))
                ) : (
                    <p>Aucun type disponible</p>
                )}
            </div>
            <br></br>id : {id}
            <button
            style={{ backgroundColor: '#AD9121', color: 'white'}} 
            onClick={allerAuPokemon}>    
                Voir pokemon en détail
            </button>

        </div>
    )
    }
    export default PokemonCard // on export ce que l'on veut afficher

    // ON peut ajouter les shiny