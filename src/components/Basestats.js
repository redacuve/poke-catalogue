import React from 'react';
import PropType from 'prop-types';

function Basestats({ stats }) {
  return (
    <div className="max-w-md mx-auto text-left">
      <span className="font-extrabold">Base Stats</span>
      {stats.map(stat => (
        <div className="w-full" key={stat.stat.name}>
          <div className="w-full shadow-inner">
            <div
              className="bg-blue-500 text-sm leading-none py-1 text-white text-left"
              style={{ width: `${(stat.base_stat * 100) / 255}%` }}
            />
            <span className="capitalize ml-3">{`${stat.stat.name}: `}</span>
            <span>{`${stat.base_stat} / 255`}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

Basestats.propTypes = {
  stats: PropType.arrayOf(PropType.object).isRequired,
};

export default Basestats;
