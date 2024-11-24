import {useEffect, useState} from 'react'
import './styles/App.css'
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import {FiSun, FiMoon} from 'react-icons/fi'
import Homepage from "./components/homepage.jsx";
import PokemonList from "./components/pokemonList.jsx";
import Pokedex from "./components/pokedex.jsx";
import {CaughtPokemonProvider} from "./services/caughtPokemonContext.jsx";

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        document.documentElement.className = darkMode ? "dark" : "light";
    }, [darkMode]);

    return (
        <CaughtPokemonProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <nav className={"custom-navbar"}>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/pokemonList"}>Pokemon List</Link>
                    <Link to={"/pokedex"}>Pokedex</Link>
                    <button onClick={toggleDarkMode} className={"toggle-dark-mode-btn"} aria-label={"Toggle Dark Mode"}>
                        {darkMode ? <FiMoon/> : <FiSun/>}
                    </button>
                </nav>
                <Routes>
                    <Route path="/" element={<Homepage />}></Route>
                    <Route path={"/pokemonList"} element={<PokemonList />}></Route>
                    <Route path={"/pokedex"} element={<Pokedex />}></Route>
                </Routes>
            </Router>
        </CaughtPokemonProvider>
    );
}

export default App;