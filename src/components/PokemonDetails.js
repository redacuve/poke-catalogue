import React from 'react';
import PropType from 'prop-types';
import Basestats from './Basestats';
import defaultSRC from '../helpers/index';

function PokemonDetails({ pokemon }) {
  return (
    <div className="text-right max-w-md mx-auto">
      <h2 className="uppercase text-indigo-900 font-extrabold underline text-center">
        {pokemon.name}
      </h2>
      <div className="flex justify-center">
        <img
          onError={defaultSRC}
          src={
            pokemon.sprites.front_default
            || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
          }
          alt={pokemon.name}
          className="w-40"
        />
      </div>
      <p>
        <span className="font-extrabold">Height:&nbsp;</span>
        <span>{pokemon.height / 10}</span>
        &nbsp;m.&nbsp;
        <i className="fas fa-arrows-alt-v" />
      </p>
      <p>
        <span className="font-extrabold">Weight:&nbsp;</span>
        <span>{pokemon.weight / 10}</span>
        &nbsp;Kg.&nbsp;
        <i className="fas fa-weight" />
      </p>
      <div>
        <span className="font-extrabold">Type:&nbsp;</span>
        {pokemon.types.map(type => (
          <span className="capitalize" key={type.type.name}>
            {`${type.type.name} `}
          </span>
        ))}
      </div>
      <div className="">
        <span className="font-extrabold">Abilities:&nbsp;</span>
        {pokemon.abilities.map(ability => (
          <span className="capitalize" key={ability.ability.name}>
            {`${ability.ability.name} `}
          </span>
        ))}
      </div>
      <Basestats stats={pokemon.stats} />
    </div>
  );
}

PokemonDetails.propTypes = {
  pokemon: PropType.shape({
    abilities: PropType.arrayOf(PropType.object),
    name: PropType.string,
    sprites: PropType.shape({ front_default: PropType.string }),
    stats: PropType.arrayOf(PropType.object),
    height: PropType.number,
    weight: PropType.number,
    types: PropType.arrayOf(
      PropType.shape({
        slot: PropType.number,
        type: PropType.shape({ name: PropType.string, url: PropType.string }),
      }),
    ),
  }).isRequired,
};

export default PokemonDetails;
