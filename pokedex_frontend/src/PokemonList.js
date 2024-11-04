import React, {useEffect} from "react";
import axios from "axios";

function PokemonList() {
    //variables
    const [pokemonList, setPokemonList] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [catchedPokemon, setCatchedPokemon] = React.useState(false);


    //get all pokemon
    const getPokedex = async () => {
        try {
            const response = await axios.get("https://poketracker-backend.onrender.com/pokemon-list");
            // Add 'caught' property to each Pokémon
            const dataWithCaught = response.data.map(pokemon => ({ ...pokemon, caught: false }));
            setPokemonList(dataWithCaught);
            setError(null);
        } catch (err) {
            setError("Pokémon not found.");
        }
    };


    //run getPokedex when component mounts
    useEffect(() => {
        getPokedex();
    } , []);


    // caught
    const toggleCaught = (id) => {
        setPokemonList(prevList =>
            prevList.map(pokemon =>
                pokemon.id === id ? { ...pokemon, caught: !pokemon.caught } : pokemon
            )
        );
    };


    //Display pokemonNames
    const pokedexDisplay = () => {
        return pokemonList.map((pokemon, index) => (
            <div key={index} style={{
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
                    <label style={{fontSize: '12px'}} htmlFor={`caughtPokemon-${pokemon.id}`}>Caught?</label>
                    <input
                        type="checkbox"
                        id={`caughtPokemon-${pokemon.id}`}
                        name='caughtPokemon'
                        value={pokemon.name}
                        checked={pokemon.caught}
                        onChange={() => toggleCaught(pokemon.id)}
                    />
                </div>

            </div>
        ));
    };

    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>Pokédex</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div>
                <h1>Caught Pokémon</h1>
                <ul style={{listStyleType: 'none', padding: 0}}>
                    {pokemonList.filter(pokemon => pokemon.caught).map(pokemon => (
                        <li key={pokemon.id}>
                            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                        </li>
                    ))}
                </ul>
            </div>
            <h1>All Pokémon</h1>
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