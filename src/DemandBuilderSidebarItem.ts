import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ACTION } from './models/priv-terms.js';

@customElement('demand-builder-sidebar-item')
export class DemandBuilderSidebarItem extends LitElement {
  @property({ type: Boolean }) checked: boolean = false;

  @property({ type: Boolean }) disabled: boolean = false;

  @property({}) id: ACTION = ACTION.ACCESS;

  @property({ type: String }) title: string = '';

  @property({ type: String }) description: string = '';

  static styles = css`
    :host {
      height: 100px;
    }

    :host button {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
    }

    .sidebar-btn {
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 4fr;
      height: 100%;
      width: 100%;
      border: none;
      background-color: #fafafa;
      text-align: left;
    }

    .sidebar-txt {
      padding: 0px 10px 0px 0px;
    }
  `;

  handleClick() {
    const event = new CustomEvent('sidebar-click', {
      bubbles: true,
      composed: true,
      detail: {
        id: this.id,
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <button class="sidebar-btn" ?disabled=${this.disabled} @click=${this.handleClick}>
        <input type="radio" ?disabled=${this.disabled} ?checked=${this.checked}></input>
        <span class="sidebar-txt"><b>${this.title}:</b> ${this.description}</span>
      </button>
    `;
  }
}
