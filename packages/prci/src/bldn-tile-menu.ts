import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

interface Tile {
  title: string,
  description: string,
  value: string
}

@customElement('bldn-tile-menu')
export class BldnTileMenu extends LitElement {

  @property({ type: Array }) tiles: Tile[] = []

  handleTileClick(value: string) {
    this.dispatchEvent(new CustomEvent('bldn-tile-menu:tile-click', {
      detail: { value }
    }))
  }

  render() {
    return html`
      ${map(this.tiles, tile => html`
        <button @click=${() => this.handleTileClick(tile.value)}>
          <strong>${tile.title}</strong>
          <p>${tile.description}</p>
        </button>
      `)}
    `
  }

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(3, 1fr)
    }
  `

}