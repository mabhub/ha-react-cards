import React from 'react'
import ReactDOM from 'react-dom/client'
import attr2prop from 'react-attr-converter';

import StdCard from './components/StdCard.js';

// https://github.com/home-assistant/frontend/tree/20231208.2/src/components

const Station = props => {
  return (
    <div>
      {props.friendly_name}
    </div>
  );
};

const Carburants = ({
  hass: { states = {} } = {},
  config = {},
}) => {
  const entities = config.entities.map(({ entity }) => states[entity]);

  return (
    <StdCard>
      {entities.map(({ context: { id }, attributes }) => (
        <Station {...attributes} key={id} />
      ))}

      <details>
        <pre>
          {JSON.stringify(entities, null, 2)}
        </pre>
      </details>
    </StdCard>
  );
};

// https://gist.github.com/thomasloven/1de8c62d691e754f95b023105fe4b74b
class CarburantsElement extends HTMLElement {
  constructor () {
    super();
    this._internals = this.attachInternals();
    this.reactRoot = ReactDOM.createRoot(this);
  }

  connectedCallback () {
    // console.log('connectedCallback');
  }

  disconnectedCallback () {
    // console.log('disconnectedCallback');
  }

  adoptedCallback () {
    // console.log('adoptedCallback');
  }

  attributeChangedCallback (name, oldValue, newValue) {
    // console.log('attributeChangedCallback', { name, oldValue, newValue });
    this.reactRender();
  }

  reactRender (extraProps = {}) {
    if (!this.reactRoot) { return; }

    // Provider Custom HTML element attributes as props
    const props = this.getAttributeNames().reduce((acc, attributeName) => {
      return {...acc, [attr2prop(attributeName)]: this.getAttribute(attributeName)};
    }, {});

    this.reactRoot.render(
      <Carburants
        {...props}
        {...extraProps}
        hass={this.hassState}
        config={this.cardConfig}
      />
    );
  }

  set hass(hass) {
    this.hassState = hass;
    this.reactRender();
  }

  setConfig (config) {
    this.cardConfig = config;
    this.reactRender();
  }
}

customElements.define("react-carburants", CarburantsElement);
