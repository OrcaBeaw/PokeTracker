import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { CaughtPokemonContext } from './CaughtPokemonContext';

function PokemonList() {
    const [pokemonList, setPokemonList] = React.useState([]);
    const [error, setError] = React.useState(null);

    // Use caught Pokémon context
    const { caughtPokemon, toggleCaughtPokemon } = useContext(CaughtPokemonContext);

    const getPokedex = async () => {
        try {
            const response = await axios.get("https://poketracker-backend.onrender.com/pokemon-list");
            setPokemonList(response.data);
            setError(null);
        } catch (err) {
            setError("Pokémon not found.");
        }
    };

    useEffect(() => {
        getPokedex();
    }, []);

    const pokedexDisplay = () => {
        return pokemonList.map((pokemon) => (
            <div key={pokemon.id} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                margin: '10px',
                textAlign: 'center',
                height: '200px',
                width: '150px',
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)'
            }}>
                <h3>{`#${pokemon.id} - ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</h3>
                <img src={pokemon.front_pic} alt={pokemon.name} style={{width: '100px', height: '100px'}}/>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <label style={{fontSize: '12px'}}>Caught?</label>
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
            <h1>Pokédex</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {pokedexDisplay()}
            </div>
        </div>
    );
}

export default PokemonList;
