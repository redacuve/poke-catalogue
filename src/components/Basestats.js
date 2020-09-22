import React from 'react';
import PropType from 'prop-types';

function Basestats({ stats }) {
  return <div>Base Stats</div>;
}

Basestats.propTypes = {
  stats: PropType.arrayOf(PropType.object).isRequired,
};

export default Basestats;
