import React, {useEffect} from "react";
import axios from "axios";

function PokemonList() {
    //variables
    const [pokemonList, setPokemonList] = React.useState([]);
    const [error, setError] = React.useState(null);

    //get all pokemon
    const getPokedex = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/pokemon-list");
            setPokemonList(response.data);
            setError(null);
        } catch (err) {
            setError("Pokémon not found.");
        }
    };

    //run getPokedex when component mounts
    useEffect(() => {
        getPokedex();
    } , []);

    //Display pokemonNames
    const pokedexDisplay = () => {
        return pokemonList.map((pokemon, index) => (
            <div key={index} style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                margin: '10px',
                textAlign: 'center',
                width: '150px',
                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)'
            }}>
                <h3>{`#${pokemon.id} - ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</h3>
                <img src={pokemon.front_pic} alt={pokemon.name} style={{ width: '100px', height: '100px' }} />
            </div>
        ));
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Pokédex</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
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