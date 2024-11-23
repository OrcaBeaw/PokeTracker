import React, {useState, useContext} from "react";
import axios from "axios";
import "../styles/index.css"
import {CaughtPokemonContext} from "./caughtPokemonContext";


function Homepage() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState(null);

    const {caughtPokemon, toggleCaughtPokemon} = useContext(CaughtPokemonContext);


    const fetchPokemon = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`https://poketracker-backend.onrender.com/pokemon/${pokemonName}`);
            const data = response.data;
            data.front_pic = data.sprites.front_default; // Reassign the image property
            data.types = data.types.map((typeInfo) => typeInfo.type.name).join(', '); // Reassign the types property
            setPokemonData(data);
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
                        <img src={pokemonData.front_pic} alt={pokemonData.name}/>
                        <p>Height: {pokemonData.height}</p>
                        <p>Weight: {pokemonData.weight}</p>
                        <p>Base Experience: {pokemonData.base_experience}</p>
                        <p>Types: {pokemonData.types}</p>
                    </div>

                    <div className="caught-container">
                        <label>Caught?</label>

                        <input type={"checkbox"}
                               checked={caughtPokemon.some((pokemon) => pokemon.id === pokemonData.id)}
                               onChange={() => toggleCaughtPokemon(pokemonData)}
                        />
                    </div>

                </div>
            )}
        </div>
    );
}

export default Homepage;