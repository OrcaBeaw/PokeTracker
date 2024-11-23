import axios from 'axios';
import React, {useState, useEffect, useContext} from "react";
import '../styles/pokemonList.css';
import {CaughtPokemonContext} from "./caughtPokemonContext";

function GetPokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {caughtPokemon, toggleCaughtPokemon} = useContext(CaughtPokemonContext);

    const getPokedex = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('https://poketracker-backend.onrender.com/pokemon-list', {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setPokemonList(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching Pokemon:', error);
            setPokemonList([]);
            setError("Failed to load Pokemon. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPokedex();
    }, []);

    const pokedexDisplay = () => {
        return pokemonList.map((pokemon) => (
            <div key={pokemon.id} className={"displayList"}>
                <h3>{`#${pokemon.id} - ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</h3>
                <img src={pokemon.front_pic} alt={pokemon.name}/>
                <div className="caught-container">
                    <label>Caught?</label>
                    <input type={"checkbox"}
                           checked={caughtPokemon.some((p) => p.id === pokemon.id)}
                           onChange={() => toggleCaughtPokemon(pokemon)}
                    />
                </div>
            </div>
        ));
    };

    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>Pokémon List</h1>
            <p>Note: Initial load <em>may</em> be longer due to slow deployment services being used</p>
            {isLoading && <p>Loading Pokémon...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div className={"displayDiv"}>
                {!isLoading && pokedexDisplay()}
            </div>
        </div>
    );
}

export default GetPokemonList;