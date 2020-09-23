import React, { useState } from 'react';
import pokeball from '../assets/img/pokeball.png';
import Popup from '../components/Popup';

function Navbar() {
  const [pokeSearch, setPokesearch] = useState('');
  const [result, setResult] = useState({});
  const [popUp, setPopUp] = useState(false);
  const [error, setError] = useState(false);

  const closePopup = () => {
    setPopUp(false);
    setResult({});
  };

  const handleChange = e => {
    setPokesearch(e.target.value);
  };

  const searchPokemon = async name => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (response.status === 200) {
      const data = await response.json();
      setResult(data);
    } else {
      setError(true);
    }
  };

  const clickSearch = () => {
    if (pokeSearch.length > 0) {
      const pokeS = pokeSearch.toLowerCase();
      setPopUp(true);
      searchPokemon(pokeS);
    }
  };
  return (
    <nav className="flex flex-wrap items-end justify-center sm:justify-between p-2 bg-teal-600">
      <div className="w-1/4 sm:w-1/6 md:w-1/12 lg:w-16 px-2">
        <img src={pokeball} alt="Pokeball Logo" />
      </div>
      <div className="w-auto flex sm:inline justify-center flex-wrap">
        <input
          type="search"
          placeholder="Search Pokemon"
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4"
          onChange={handleChange}
        />
        <button
          type="button"
          className="my-2 sm:my-0 ml-2 bg-transparent hover:bg-teal-100 text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded"
          onClick={clickSearch}
        >
          Search
        </button>
      </div>
      {popUp && (
        <Popup pokemon={result} closePopup={closePopup} error={error} />
      )}
    </nav>
  );
}

export default Navbar;
