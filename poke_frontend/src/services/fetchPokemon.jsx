import React, { useState } from "react";
import axios from "axios";
import "../styles/index.css"

function Homepage() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState(null);

    const fetchPokemon = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`https://poketracker-backend.onrender.com/pokemon/${pokemonName}`);
            setPokemonData(response.data);
            setError(null);
        } catch (error) {
            setPokemonData(null);
            setError("Pokemon not found");
            console.log(error);
        }
    };

    return (
        <div className={"searchContainer"}>
            <h1>Pokedex</h1>
            <form className={"inputContainer"} onSubmit={fetchPokemon}>
                <input
                    type={"text"}
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}
                    placeholder={"Enter Pokemon Name or ID"}
                />
                <button id={"getButton"} type={"submit"}>Search</button>
            </form>

            {pokemonData && (
                <div className={"searchResult"}>
                   <div className={"innerSearchResultContainer"}>
                    <h2>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
                    <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                    <p>Height: {pokemonData.height}</p>
                    <p>Weight: {pokemonData.weight}</p>
                    <p>Base Experience: {pokemonData.base_experience}</p>
                    <p>Types: {pokemonData.types.map((typeInfo) => typeInfo.type.name).join(', ')}</p>
                    <p>Abilities: {pokemonData.abilities.map((abilityInfo) => abilityInfo.ability.name).join(', ')}</p>
                   <label>Caught?</label>
                   <input type={"checkbox"}/>
                   </div>
                </div>
            )}
        </div>
    );
}

export default Homepage;