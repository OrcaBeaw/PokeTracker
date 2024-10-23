import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonData, setPokemonData] = useState(null);
    const [error, setError] = useState(null);

    const fetchPokemon = async () => {
        try {
            // Make a GET request to the Flask server to fetch Pokémon data
            const response = await axios.get(`http://127.0.0.1:5000/pokemon/${pokemonName}`);
            setPokemonData(response.data);
            setError(null);
        } catch (err) {
            setPokemonData(null);
            setError('Pokémon not found. Please check the name or ID.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Pokédex</h1>
            <input
                type="text"
                value={pokemonName}
                onChange={(e) => setPokemonName(e.target.value.toLowerCase())}
                placeholder="Enter Pokémon name or ID"
            />
            <button onClick={fetchPokemon}>Search</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {pokemonData && (
                <div>
                    <h2>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
                    <img
                        src={pokemonData.sprites.front_default}
                        alt={pokemonData.name}
                    />
                    <p>Types: {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
                    <p>Abilities: {pokemonData.abilities.map((ability) => ability.ability.name).join(', ')}</p>
                    <p>Height: {pokemonData.height}</p>
                    <p>Weight: {pokemonData.weight}</p>
                    <p>Base Experience: {pokemonData.base_experience}</p>
                </div>
            )}
        </div>
    );
}

export default App;