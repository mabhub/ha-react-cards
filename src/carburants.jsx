import "https://unpkg.com/react@18/umd/react.development.js";
import "https://unpkg.com/react-dom@18/umd/react-dom.development.js";

import StdCard from './components/StdCard.js';

// https://github.com/home-assistant/frontend/tree/20231208.2/src/components

const Station = props => {
  return (
    <div />
  );
};

const Carburants = ({
  hass: { states = {} },
  config = {},
}) => {
  const entities = config.entities.map(({ entity }) => states[entity]);

  return (
    <StdCard>
      {entities.map(({ context: { id }, attributes }) => (
        <Station {...attributes} key={id} />
      ))}

      <pre>
        {JSON.stringify(entities, null, 2)}
      </pre>
    </StdCard>
  );
};

class CardCarburants extends HTMLElement {
  set hass(hass) {
    // Whenever the state changes, a new `hass` object is set.
    if (!this.reactRoot) { this.reactRoot = ReactDOM.createRoot(this); }
    this.reactRoot.render(<Carburants hass={hass} config={this.config} />);
  }

  // The user supplied configuration.
  // Throw an exception and Home Assistant will render an error card.
  setConfig(config) {
    this.config = config;
    this.reactRoot?.render(<Carburants hass={hass} config={config} />);
  }

  // The height of your card.
  // Home Assistant uses this to automatically distribute all cards over the available columns.
  getCardSize() {
    return this.config.size || 3;
  }
}

customElements.define("react-carburants", CardCarburants);