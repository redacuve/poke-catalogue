import React from 'react';
import pokeball from '../assets/img/pokeball.png';

function Navbar() {
  return (
    <nav className="flex flex-wrap items-end justify-center sm:justify-between p-2 bg-teal-600">
      <div className="w-1/4 sm:w-1/6 md:w-1/12 lg:w-16 px-2">
        <img src={pokeball} alt="Pokeball Logo" />
      </div>
      <div className="w-auto flex sm:inline justify-center flex-wrap">
        <input type="search" placeholder="Search Pokemon" className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4" />
        <button type="button" className="my-2 sm:my-0 ml-2 bg-transparent hover:bg-teal-100 text-white font-semibold hover:text-black py-2 px-4 border border-white hover:border-transparent rounded">Search</button>
      </div>
    </nav>
  );
}

export default Navbar;
