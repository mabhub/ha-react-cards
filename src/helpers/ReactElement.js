import React from 'react';
import ReactDOM from 'react-dom/client';
import attr2prop from 'react-attr-converter';

// https://gist.github.com/thomasloven/1de8c62d691e754f95b023105fe4b74b
class ReactElement extends HTMLElement {
  constructor () {
    super();
    this._component = 'div';
  }

  _createRoot () {
    this.mountPoint = document.createElement('div');
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(this.mountPoint);
    this.reactRoot = ReactDOM.createRoot(this.mountPoint);
  }

  _reactRender (extraProps = {}) {
    if (!this.reactRoot) { this._createRoot(); }

    // Provider Custom HTML element attributes as props
    const props = this.getAttributeNames().reduce((acc, attributeName) => {
      return {...acc, [attr2prop(attributeName)]: this.getAttribute(attributeName)};
    }, {});

    const Component = this._component;

    this.reactRoot.render(
      <Component
        {...props}
        {...extraProps}
        hass={this._hassState}
        config={this._cardConfig}
      />
    );
  }

  set hass(hass) {
    this._hassState = hass;
    this._reactRender();
  }

  setConfig (config) {
    this._cardConfig = config;
    this._reactRender();
  }

  attributeChangedCallback (name, oldValue, newValue) {
    this._reactRender();
  }
}

export default ReactElement;