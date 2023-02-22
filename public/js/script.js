const axios = require('axios');

// URL da API PokeAPI
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';


async function getPokemonData() {
    const pokemonName = 'pikachu'
    try {
        const response = await axios.get(apiUrl + pokemonName);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// Chamada da função para obter dados do Pokemon "pikachu"
getPokemonData('pikachu')
  .then((data) => console.log(data))
  .catch((error) => console.error(error));