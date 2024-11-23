import axios from 'axios';
import React, {useState, useEffect, useContext} from "react";
import '../styles/pokemonList.css';
import {CaughtPokemonContext} from "./caughtPokemonContext";

function GetPokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState(null);

    const {caughtPokemon, toggleCaughtPokemon} = useContext(CaughtPokemonContext);

    const getPokedex = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/pokemon-list`);
            const data = response.data;
            if (Array.isArray(data.types)) {
                data.types = data.types.map((typeInfo) => typeInfo.type.name).join(', ');
            }
            setPokemonList(data);
            setError(null);
        } catch (error) {
            setPokemonList([]);
            setError("Pokemon not found");
            console.log(error);
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
                    <input type={"checkbox"}
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
            <p>Note: Initial load <em>may</em> be longer due to slow deployment services being used</p>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div className={"displayDiv"}>
                {pokedexDisplay()}
            </div>
        </div>
    );
}

export default GetPokemonList;