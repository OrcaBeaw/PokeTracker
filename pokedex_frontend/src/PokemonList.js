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
         <div  key={index}>
             <h2>{pokemon.name}</h2>
            </div>
        ));
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Pokédex</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>{pokedexDisplay()}</div>
        </div>
    );
}


export default PokemonList;