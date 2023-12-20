import React from 'react';

import ReactElement from './helpers/ReactElement.js';

import HaCard from './components/HaCard.js';
import Station from './components/Station.js';

// https://github.com/home-assistant/frontend/tree/20231208.2/src/components

const Carburants = ({ hass, config }) => {
  const entities = config.entities.map(({ entity }) => ({
    entityState: hass?.states[entity],
    entity,
  }));

  return (
    <HaCard config={config}>
      {entities.map(({ entityState = {}, entity}) => (
        <Station {...entityState} key={entity} />
      ))}
    </HaCard>
  );
};

class CarburantsElement extends ReactElement {
  constructor () {
    super();
    this._component = Carburants;
  }
}

customElements.define("react-carburants", CarburantsElement);
