import React from 'react';
import PropType from 'prop-types';
import Loading from './Loading';
import PokemonDetails from './PokemonDetails';

function NotPokemonDisplay({ error }) {
  if (error) {
    return (
      <div className="font-bold">
        No Results... Please try again with a different Search Term
      </div>
    );
  }
  return <Loading />;
}

function Popup({ pokemon, closePopup, error = false }) {
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
          <PokemonDetails pokemon={pokemon} />
        ) : (
          <NotPokemonDisplay error={error} />
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
  error: PropType.bool,
};

Popup.defaultProps = {
  pokemon: {},
  error: false,
};

NotPokemonDisplay.propTypes = {
  error: PropType.bool.isRequired,
};

export default Popup;
