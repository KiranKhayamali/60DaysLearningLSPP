#!/usr/bin/env node

// console.log("Learning about pokedex");

const yargs = require("yargs");
const {argv} = yargs(process.argv);
const printTenMoves = async (pokemonName) => {
    const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemon = await response.json();
    const moves = pokemon.moves.map(({move}) => move.name);
    console.log(moves.slice(0,10));
};

printTenMoves(argv.pokemon);
