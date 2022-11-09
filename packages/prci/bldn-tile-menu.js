import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

let BldnTileMenu = class BldnTileMenu extends LitElement {
    constructor() {
        super(...arguments);
        this.tiles = [];
    }
    handleTileClick(value) {
        this.dispatchEvent(new CustomEvent('bldn-tile-menu:tile-click', {
            composed: true,
            detail: { value },
        }));
    }
    render() {
        return html `
      ${map(this.tiles, tile => html `
          <button @click=${() => this.handleTileClick(tile.value)}>
            <h1>${tile.title}</h1>
            <p>${tile.description}</p>
          </button>
        `)}
    `;
    }
};
BldnTileMenu.styles = css `
    :host {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: 1fr;
      gap: 2.5em;
    }

    button {
      display: flex;
      flex-direction: column;
      padding: 1.25em;
      align-items: center;
      justify-content: flex-start;

      font-family: var(--bldn-tile-menu-font-family, var(--font-family));
      border: none;
      border-radius: 20px;
      box-shadow: 0px 33px 96px rgba(0, 0, 0, 0.16),
        0px 9.94853px 28.9412px rgba(0, 0, 0, 0.104254),
        0px 4.13211px 12.0207px rgba(0, 0, 0, 0.08),
        0px 1.4945px 4.34765px rgba(0, 0, 0, 0.0557458);
      background: white;
      transition: 0.3s ease-out;
    }

    button:hover {
      background: var(--bldn-tile-menu-hover-color, var(--color-light));
      transition: 0.3s ease;
    }

    h1 {
      color: var(--bldn-tile-menu-title-font-color, var(--color-darkest));
      font-size: var(--bldn-tile-menu-title-font-size, var(--font-size-medium));
    }

    p {
      display: flex;
      color: var(--bldn-tile-menu-description-font-color, var(--color-dark));
      font-size: var(
        --bldn-tile-menu-description-font-size,
        var(--font-size-small)
      );
      padding: 1em 0em;
      margin: 0;
    }
  `;
__decorate([
    property({ type: Array })
], BldnTileMenu.prototype, "tiles", void 0);
BldnTileMenu = __decorate([
    customElement('bldn-tile-menu')
], BldnTileMenu);

export { BldnTileMenu };
//# sourceMappingURL=bldn-tile-menu.js.map
