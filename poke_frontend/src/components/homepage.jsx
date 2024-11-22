import React, {useState} from "react";
import FetchPokemon from "../services/fetchPokemon.jsx";


function Homepage() {

    return (
        <div>
         <FetchPokemon />
        </div>
    )
}
export default Homepage;