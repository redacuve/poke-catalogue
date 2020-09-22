import React from 'react';
import PropType from 'prop-types';
import Loading from './Loading';
import Basestats from './Basestats';
import defaultSRC from '../helpers/index';

function Popup({ pokemon, closePopup }) {
  return (
    <div className="fixed w-full h-full bg-opacity-50 bg-gray-900 top-0 left-0">
      <div className="relative p-4 sm:m-8 sm:mx-12 md:m-16 md:mx-20 lg:m-24 lg:mx-32 bg-white bg-opacity-75">
        <span // eslint-disable-line jsx-a11y/click-events-have-key-events
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          role="button"
          onClick={closePopup}
          tabIndex={-1}
        >
          <svg
            className="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
        {Object.keys(pokemon).length ? (
          <div className="text-right max-w-md mx-auto">
            <h2 className="uppercase text-indigo-900 font-extrabold underline text-center">
              {pokemon.name}
            </h2>
            <div className="flex justify-center">
              <img
                onError={defaultSRC}
                src={pokemon.sprites.front_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'}
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
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

Popup.propTypes = {
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
  }),
  closePopup: PropType.func.isRequired,
};

Popup.defaultProps = {
  pokemon: {},
};

export default Popup;
