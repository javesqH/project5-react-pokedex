import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({ url}) => {

    const [ pokemon, setPokemon ] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
         axios.get(url)
         .then(res => setPokemon(res.data))
    }, [])

    

    return (
        <div onClick={() => navigate(`/pokedex/${pokemon.id}`)} className='pokemon-card'>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites?.front_default} alt="" className='img-size' />
        </div>
    );
};

export default PokemonCard;