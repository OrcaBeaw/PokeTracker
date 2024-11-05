import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CaughtPokemonProvider } from './CaughtPokemonContext';
import HomePage from './HomePage';
import PokemonList from './PokemonList';
import Pokedex from './Pokedex';

function App() {
    return (
        <CaughtPokemonProvider>
            <Router>
                <nav style={{ padding: '10px', textAlign: 'center' }}>
                    <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
                    <Link to="/pokemon-list" style={{ margin: '0 10px' }}>Pokémon List</Link>
                    <Link to="/pokedex" style={{ margin: '0 10px' }}>Pokédex</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/pokemon-list" element={<PokemonList />} />
                    <Route path="/pokedex" element={<Pokedex />} />
                </Routes>
            </Router>
        </CaughtPokemonProvider>
    );
}

export default App;
