import React, {useEffect, useContext} from "react";
import GetPokemonList from "../services/getPokemonList.jsx";

function pokemonList () {

return (
    <div>
        <GetPokemonList/>
    </div>
)
}

export default pokemonList