import React from 'react';
import PropType from 'prop-types';
import Loading from './Loading';
import Basestats from './Basestats';

function Popup({ pokemon }) {
  return (
    <div className="fixed w-full h-full bg-opacity-50 bg-gray-900">
      <div className="absolute p-4 sm:p-8 sm:px-12 md:p-16 md:px-20 lg:p-24 lg:px-32">
        {Object.keys(pokemon).length ? (
          <>
            <h2 className="capitalize">{pokemon.name}</h2>
            <div>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
            <p>
              Height:&nbsp;
              <span>{pokemon.height / 10}</span>
              &nbsp;m.
            </p>
            <p>
              Weight:&nbsp;
              <span>{pokemon.weight / 10}</span>
              &nbsp;Kg.
            </p>
            <div className="">
              Type:&nbsp;
              {pokemon.types.map((type) => (
                <span className="capitalize" key={type.type.name}>
                  {`${type.type.name} `}
                </span>
              ))}
            </div>
            <div className="">
              Abilities:&nbsp;
              {pokemon.abilities.map((ability) => (
                <span className="capitalize" key={ability.ability.name}>
                  {`${ability.ability.name} `}
                </span>
              ))}
            </div>
            <div>
              <Basestats stats={pokemon.stats} />
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

Popup.propTypes = {
  pokemon: PropType.shape({
    abilities: PropType.arrayOf(PropType.object).isRequired,
    name: PropType.string.isRequired,
    sprites: PropType.shape({ front_default: PropType.string }),
    stats: PropType.arrayOf(PropType.object).isRequired,
    height: PropType.number.isRequired,
    weight: PropType.number.isRequired,
    types: PropType.arrayOf(
      PropType.shape({
        slot: PropType.number,
        type: PropType.shape({ name: PropType.string, url: PropType.string }),
      })
    ),
  }),
};

Popup.defaultProps = {
  pokemon: {},
};

export default Popup;
