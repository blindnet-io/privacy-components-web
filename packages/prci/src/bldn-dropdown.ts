import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const arrowSvg = new URL(
  './assets/icons/akar-icons_chevron-down.svg',
  import.meta.url
).href;

const smallArrowSvg = new URL(
  './assets/icons/akar-icons_chevron-down-small.svg',
  import.meta.url
).href;

@customElement('bldn-dropdown')
export class BldnDropdown extends LitElement {
  /** @prop */
  @property({ type: String, reflect: true }) mode: 'major' | 'minor' = 'minor';

  /** @prop open - Indicates if the dropdown is open or closed */
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  render() {
    return html`
      <div id='heading'>
        <slot name='heading'>${msg('Click to expand')}</slot>
        <button @click=${() => {
          this.open = !this.open;
        }}><img id='dropdown-button-image' src=${
      this.mode === 'minor' ? smallArrowSvg : arrowSvg
    } alt=${msg('Arrow to expand or collapse the dropdown')}></img></button>
      </div>
      <div id='content'>
        <slot></slot>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 0.625em 0em;
    }

    :host[open] {
      padding: 0.625em 0em 1.25em 0em;
    }

    #heading {
      display: flex;
      text-align: left;
      align-items: center;
    }

    :host([open][mode='major']) #heading {
      padding-bottom: 2.5em;
      border-bottom: 2px solid
        var(
          --bldn-dropdown-major-section-heading-border-color,
          var(--color-lightest)
        );
      margin: 0em -2em;
    }

    :host([open][mode='major']) slot[name='heading'] {
      text-indent: 2em;
    }

    :host([open][mode='major']) button {
      padding-right: 2.5em;
    }

    :host([mode='minor']) button {
      padding-right: 0.42em;
    }

    :host([open]) #dropdown-button-image {
      /* Flip the dropdown arrow when open */
      -webkit-transform: scaleY(-1);
      transform: scaleY(-1);
    }

    #content {
      display: none;
    }

    :host([open]) #content {
      display: block;
    }

    button {
      border: none;
      background: none;
      margin-left: auto;
      padding: 0;
    }
  `;
}
