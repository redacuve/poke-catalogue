import React from 'react';
import PropTypes from 'prop-types';
import defaultSRC from '../helpers/index';

function Pokemon({ index, pokemon, clickFunc }) {
  const setSource = index => {
    if (index < 721) {
      const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        index + 1
      }.png`;
      return src;
    }
    const src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`;
    return src;
  };

  const getPokemon = async name => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  };

  const clickHandler = () => {
    clickFunc(getPokemon(pokemon.name));
  };

  return (
    <div
      key={pokemon.name}
      className="shadow rounded w-full sm:w-1/2 p-2 md:w-1/3 lg:w-1/4 xl:w-1/5"
      onClick={clickHandler}
      role="button"
      tabIndex={0}
      onKeyPress={(e => {
        if (e.key === 'Enter') {
          clickHandler();
        }
      })}
    >
      <div className="w-full">
        <img
          onError={defaultSRC}
          src={setSource(index)}
          alt={pokemon.name}
          className="w-full"
        />
      </div>
      <p
        className="w-full bg-orange-800 text-white text-center text-3xl md:text-2xl lg:text-xl"
        key={pokemon.name}
      >
        {`#${index + 1} `}
        <span className="capitalize">
          {pokemon.name}
        </span>
      </p>
    </div>
  );
}

Pokemon.propTypes = {
  index: PropTypes.number.isRequired,
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  clickFunc: PropTypes.func.isRequired,
};

export default Pokemon;
