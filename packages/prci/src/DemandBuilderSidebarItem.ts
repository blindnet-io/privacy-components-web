import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ACTION } from './models/priv-terms.js';

/**
 * A single item on the DemandBuilder sidebar.
 */
@customElement('demand-builder-sidebar-item')
export class DemandBuilderSidebarItem extends LitElement {
  // Checked attribute mapping to the checked attribute of the HTMLInputElement
  // for this sidebar item
  @property({ type: Boolean }) checked: boolean = false;

  // Disabled attribute mapping to the disabled attribute of the HTMLButtonElement and
  // HTMLInputElement for this sidebar item
  @property({ type: Boolean }) disabled: boolean = false;

  // Unique identifier for this sidebar item
  @property({}) id: ACTION = ACTION.ACCESS;

  // Title string for this sidebar item
  @property({ type: String }) title: string = '';

  // Description string for this sidebar item
  @property({ type: String }) description: string = '';

  static styles = css`
    :host {
      min-height: 100px;
    }

    :host button {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
      background-color: white;
    }

    :host([checked]) .sidebar-btn {
      border: 2px solid #000;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      border-right: 2px solid white;
    }

    :host([checked]) {
      z-index: 1;
      margin-right: -2px;
    }

    .sidebar-btn {
      display: grid;
      align-items: center;
      grid-template-columns: 1fr 4fr;
      height: 100%;
      width: 100%;
      border: none;
      /* background-color: #fafafa; */
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
