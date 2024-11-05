import React, { useContext } from 'react';
import { CaughtPokemonContext } from './CaughtPokemonContext';

function Pokedex() {
    const { caughtPokemon } = useContext(CaughtPokemonContext);

    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>Caught Pokémon</h1>
            <h3>Refresh to reset caught Pokémons!</h3>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {caughtPokemon.length > 0 ? (
                    caughtPokemon.map((pokemon) => (
                        <div key={pokemon.id} style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                            margin: '10px',
                            textAlign: 'center',
                            height: '200px',
                            width: '150px',
                            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                            fontSize: '14px'
                        }}>
                            <h3>{`#${pokemon.id} - ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</h3>
                            <img src={pokemon.front_pic} alt={pokemon.name} style={{width: '100px', height: '100px'}}/>
                        </div>
                    ))
                ) : (
                    <p>No Pokémon caught yet!</p>
                )}
            </div>
        </div>
    );
}

export default Pokedex;
