import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import PokemonList from "./PokemonList";

function Pokedex() {
    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1>Pokédex</h1>
        </div>
    );
}

export default Pokedex;