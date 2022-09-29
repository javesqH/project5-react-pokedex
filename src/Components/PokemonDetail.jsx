import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {

    const { id } = useParams()
    const [ pokemon, setPokemon ] = useState({})
    

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => setPokemon(res.data))
    }, [])

    console.log(pokemon)

    return (
        <div className='pokemon-detail'>
           {/*  <h1>Pokemon Detail</h1>
            <p>Mostrando personaje con id: <b>{id}</b></p> */}
            <h1>{pokemon.name}</h1>
            <div className='pok'>
            <img src={pokemon.sprites?.other.home.front_default} alt="" className='img-detail-size'/>
            <div className='features'>
                  <h2>Height: {pokemon.height}</h2>
                  <h2>Weight: {pokemon.weight}</h2>
                  <h2>Experience: {pokemon.base_experience}</h2>
            </div>
            </div>
        </div>
    );
};

export default PokemonDetail;