import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi'; // Importing icons
import { CaughtPokemonProvider } from './CaughtPokemonContext';
import HomePage from './HomePage';
import PokemonList from './PokemonList';
import Pokedex from './Pokedex';

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        document.documentElement.className = darkMode ? 'dark' : 'light';
    }, [darkMode]);

    return (
        <CaughtPokemonProvider>
            <Router>
                <nav className="custom-navbar">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/pokemon-list" className="nav-link">Pokémon List</Link>
                    <Link to="/pokedex" className="nav-link">Pokédex</Link>
                    <button onClick={toggleDarkMode} className="toggle-dark-mode-btn" aria-label="Toggle Dark Mode">
                        {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
                    </button>
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
