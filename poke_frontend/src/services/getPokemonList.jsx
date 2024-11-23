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
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios({
                method: 'get',
                url: 'https://poketracker-backend.onrender.com/pokemon-list',
                withCredentials: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                timeout: 30000, // 30 second timeout
                validateStatus: (status) => status === 200
            });

            setPokemonList(response.data);
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response,
                status: error.response?.status,
                headers: error.response?.headers
            });

            let errorMessage = 'Failed to load Pokémon. ';
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                errorMessage += `Server error: ${error.response.status}`;
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage += 'No response from server. Please try again later.';
            } else {
                // Something happened in setting up the request that triggered an Error
                errorMessage += error.message;
            }

            setError(errorMessage);
            setPokemonList([]);
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
                    <input
                        type="checkbox"
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
            {isLoading && (
                <div>
                    <p>Loading Pokémon...</p>
                    <p>Note: Initial load may take up to 30 seconds due to server startup</p>
                </div>
            )}
            {error && (
                <div style={{color: 'red', margin: '20px', padding: '10px', border: '1px solid red'}}>
                    <p>{error}</p>
                    <button
                        onClick={getPokedex}
                        style={{
                            padding: '5px 10px',
                            marginTop: '10px',
                            cursor: 'pointer'
                        }}
                    >
                        Try Again
                    </button>
                </div>
            )}
            <div className={"displayDiv"}>
                {!isLoading && !error && pokedexDisplay()}
            </div>
        </div>
    );
}

export default GetPokemonList;