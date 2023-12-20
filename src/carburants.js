import React from 'react';
import ReactElement from './helpers/ReactElement.js';
import HaCard from './components/HaCard.js';

// https://github.com/home-assistant/frontend/tree/20231208.2/src/components

const Station = (props) => {
  return (
    <div>
      <details>
        <summary>
          {props.entity_id}
        </summary>
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </details>
    </div>
  );
};

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
