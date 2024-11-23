import React, {useContext} from 'react';
import {CaughtPokemonContext} from '../services/caughtPokemonContext.jsx';
import '../styles/pokemonList.css'

function Pokedex() {
    const {caughtPokemon} = useContext(CaughtPokemonContext);

    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h6 style={{color: '#ccc', marginBottom: '1px'}}>Refresh to reset caught Pokémons!</h6>
            <h1>Caught Pokémon</h1>
            <h2>Your team: </h2>
            <div className={"pokedexContainer"}>
                {caughtPokemon.length > 0 ? (
                    caughtPokemon.map((pokemon) => (
                        <div key={pokemon.id} className={"pokedexCard"}>
                            <h3>{`#${pokemon.id} - ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</h3>
                            <img src={pokemon.front_pic} alt={pokemon.name} style={{width: '100px', height: '100px'}}/>
                           <div className={"types"}>
                               <p>Types:</p>
                               <div>
                                  {`${pokemon.types}`}
                               </div>
                           </div>
                        </div>
                    ))
                ) : (
                    <p>No Pokémon caught yet!</p>
                )}
            </div>
            <h3>Your team types:</h3>
            {caughtPokemon.length > 0 ? (
                caughtPokemon.map((pokemon) => (
                    <div key={pokemon.id}>
                        <p>{`${pokemon.types}`}</p>
                    </div>
                ))
            ) : (
                <p>No Pokémon types yet!</p>
            )
            }
        </div>
    );
}

export default Pokedex;