import axios from 'axios';
import React, {useState, useEffect, useContext} from "react";
import '../styles/pokemonList.css';
import {CaughtPokemonContext} from "./caughtPokemonContext";

function GetPokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const {caughtPokemon, toggleCaughtPokemon} = useContext(CaughtPokemonContext);

    const API_URL = 'https://poketracker-backend.onrender.com';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // First try to ping the API to wake it up
                await axios.get(`${API_URL}/`);

                // Then get the Pokemon list
                const response = await axios.get(`${API_URL}/pokemon-list`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                setPokemonList(response.data);
                setError(null);
            } catch (err) {
                console.error('Error details:', err);
                setError("Failed to load Pokemon. The server might be starting up - please try again in a minute.");
                setPokemonList([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const retryLoad = () => {
        setError(null);
        setIsLoading(true);
        setPokemonList([]);
        // Force a re-render by updating state
        window.location.reload();
    };

    if (isLoading) {
        return (
            <div style={{textAlign: 'center', marginTop: '50px'}}>
                <h1>Pokémon List</h1>
                <p>Loading Pokémon...</p>
                <p>Note: First load may take up to 30 seconds if the server was inactive</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{textAlign: 'center', marginTop: '50px'}}>
                <h1>Pokémon List</h1>
                <div style={{color: 'red', margin: '20px'}}>
                    <p>{error}</p>
                    <button
                        onClick={retryLoad}
                        style={{
                            padding: '10px 20px',
                            margin: '20px',
                            cursor: 'pointer',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        Retry Loading
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>Pokémon List</h1>
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
        </div>
    );
}

export default GetPokemonList;