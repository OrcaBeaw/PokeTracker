import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage';
import PokemonList from './PokemonList';

function App() {
    return (
        <Router>
            <nav style={{ padding: '10px', textAlign: 'center' }}>
                <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
                <Link to="/list" style={{ margin: '0 10px' }}>List</Link>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/list" element={<PokemonList />} />
            </Routes>
        </Router>
    );
}

export default App;