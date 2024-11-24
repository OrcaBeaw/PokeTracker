import axios from 'axios';
import {useState, useEffect, useContext} from "react";
import '../styles/pokemonList.css';
import {CaughtPokemonContext} from "./caughtPokemonContext";

function GetPokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState(null);

    const {caughtPokemon, toggleCaughtPokemon} = useContext(CaughtPokemonContext);

    const getPokedex = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
            const data = response.data;
            const detailedPokemonList = await Promise.all(data.results.map(async (pokemon) => {
                const pokemonDetails = await axios.get(pokemon.url);
                return {
                    ...pokemon,
                    id: pokemonDetails.data.id,
                    front_pic: pokemonDetails.data.sprites.front_default,
                    types: pokemonDetails.data.types.map((typeInfo) => typeInfo.type.name).join(', ')
                };
            }));
            setPokemonList(detailedPokemonList);
            setError(null);
        } catch (error) {
            setPokemonList([]);
            setError("Error fetching Pokemon list");
            console.log(error);
        }
    };

    useEffect(() => {
        getPokedex();
    }, []);

    const pokedexDisplay = () => {
        return pokemonList.map((pokemon, index) => (
            <div key={index} className={"displayList"}>
                <h3>{`#${index + 1} - ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</h3>
                <img src={pokemon.front_pic} alt={pokemon.name}/>
                <div className="caught-container">
                    <label>Caught?</label>
                    <input type={"checkbox"}
                           checked={caughtPokemon.some((p) => p.name === pokemon.name)}
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
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div className={"displayDiv"}>
                {pokedexDisplay()}
            </div>
        </div>
    );
}

export default GetPokemonList;