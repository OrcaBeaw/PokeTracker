import axios from 'axios';
import React, {useState, useEffect, useContext} from "react";
import '../styles/pokemonList.css';
import {CaughtPokemonContext} from "./caughtPokemonContext";

function GetPokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState(null);
    const {caughtPokemon, toggleCaughtPokemon} = useContext(CaughtPokemonContext);

    useEffect(() => {
        axios.get('https://poketracker-backend.onrender.com/pokemon-list')
            .then(response => setPokemonList(response.data))
            .catch(error => {
                console.error('Error:', error);
                setError("Failed to load Pokemon");
            });
    }, []);

    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>Pokémon List</h1>
            {error ? (
                <p style={{color: 'red'}}>{error}</p>
            ) : (
                <div className="displayDiv">
                    {pokemonList.map(pokemon => (
                        <div key={pokemon.id} className="displayList">
                            <h3>{`#${pokemon.id} - ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</h3>
                            <img src={pokemon.front_pic} alt={pokemon.name}/>
                            <div className="caught-container">
                                <label>Caught?</label>
                                <input
                                    type="checkbox"
                                    checked={caughtPokemon.some(p => p.id === pokemon.id)}
                                    onChange={() => toggleCaughtPokemon(pokemon)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GetPokemonList;