import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';

const Pokedex = () => {

    const name = useSelector(state => state.userName)

    const [ pokemonsList, setPokemonsList] = useState([])
    const [ pokemonsTypeList, setPokemonTypeList ] = useState([])
    const [ nameInput, setNameInput ] = useState("")


    const navigate = useNavigate()

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/')
        .then(res => setPokemonsList(res.data.results))

        axios.get('https://pokeapi.co/api/v2/type/')
        .then(res => setPokemonTypeList(res.data.results))
    }, [])

    console.log(pokemonsTypeList)

    const searchName = () => {
          navigate(`/pokedex/${nameInput}`)
    }

    const searchPokemonType = (pokemon) => {
        if(pokemon){
            axios.get(pokemon)
            .then(res => setPokemonsList(res.data.pokemon))
        }
    }

    const [ page, setPage ] = useState(1)
    const pokemonPage = 9
    const lastPokemon = page * pokemonPage
    const firstPokemon = lastPokemon - pokemonPage
    const pokemonPaginated = pokemonsList.slice(
        firstPokemon,
        lastPokemon
    )

    const totalPages = Math.ceil(pokemonsList.length / pokemonPage)
    const pagesNumbers = []
    for (let i = 1;i <= totalPages;i ++) {
        pagesNumbers.push(i)
    }

    return (
        <div className='principal-pokemon'>
            <h1>Pokedex</h1>
            <h2>Welcome {name}</h2>
            {
                pagesNumbers.map(number => (
                    <button onClick={() => setPage(number)}> {number}</button>
                ))
            }
            <br />
            <br />
            <div className='btn-pages'>
            <button
                onClick={() => setPage(page-1)}
                disabled={page === 1}
            >
                Prev page
            </button>
            <button
                onClick={() => setPage(page+1)}
                disabled={page === totalPages}
            >
                Next page
            </button>
            </div>
            <br />
            <br />
            <div>
                <input 
                type="text" 
                placeholder='search by name' 
                value={nameInput}
                onChange = {e => setNameInput(e.target.value)}
                />
                <button onClick={searchName}>Search</button>
            </div>
            <br />
            <br />
            <div>
                <select onChange={e => searchPokemonType(e.target.value)}>
                     <option value="">Selection by type</option>
                     {pokemonsTypeList.map(type => (
                        <option value={type.url} key={type.url}>
                            {type.name}
                            </option>
                     ))}
                </select>
            </div>
            <br />
            <br />
            <div className='pokemons-list'>
            {
                pokemonPaginated.map(pokemon => (
                   <PokemonCard 
                   url = {pokemon.url ? pokemon.url : pokemon.pokemon.url} 
                   key = {pokemon.url ? pokemon.url : pokemon.pokemon.url}/>
                ))
            }
            </div>
        </div>
    );
};

export default Pokedex;