import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const typeColors = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dark: '#705848',
  dragon: '#7038F8',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  normal: '#A8A878'
};

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const detailedList = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokeDetails = await axios.get(pokemon.url);
            return pokeDetails.data;
          })
        );
        setPokemonList(detailedList);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  const getTypeColor = (types) => {
    return types.length ? typeColors[types[0].type.name] : 'gray';
  };

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="pokemon-list">
        {filteredPokemonList.length > 0 ? (
          filteredPokemonList.map(pokemon => (
            <div
              className="pokemon-card"
              key={pokemon.id}
              style={{ backgroundColor: getTypeColor(pokemon.types) }}
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
              <h3>{pokemon.name}</h3>
            </div>
          ))
        ) : (
          <p>This Pokemon is still unexplored Lets go get it!!!</p>
        )}
      </div>
    </div>
  );
}

export default App;
