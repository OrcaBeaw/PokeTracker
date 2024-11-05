import React, { createContext, useState } from 'react';

// Create context
export const CaughtPokemonContext = createContext();

// Context provider component
export const CaughtPokemonProvider = ({ children }) => {
    const [caughtPokemon, setCaughtPokemon] = useState([]);

    // Function to add or remove caught Pokémon
    const toggleCaughtPokemon = (pokemon) => {
        setCaughtPokemon((prevCaught) => {
            if (prevCaught.find((p) => p.id === pokemon.id)) {
                // If Pokémon is already caught, remove it
                return prevCaught.filter((p) => p.id !== pokemon.id);
            } else {
                // Add Pokémon if not already caught
                return [...prevCaught, pokemon];
            }
        });
    };

    return (
        <CaughtPokemonContext.Provider value={{ caughtPokemon, toggleCaughtPokemon }}>
            {children}
        </CaughtPokemonContext.Provider>
    );
};
