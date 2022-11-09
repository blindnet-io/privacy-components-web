import { ProvenanceRestriction } from '@blindnet/core';
import { msg } from '@lit/localize';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PROVENANCE_DESCRIPTIONS } from './utils/dictionary.js';

/**
 * @event {CustomEvent} bldn-provenance-restriction:term-change - Fired when term selection changes
 * @event {CustomEvent} bldn-provenance-restriction:target-change - Fired when target selection changes
 */
@customElement('bldn-provenance-restriction')
export class BldnProvenanceRestriction extends LitElement {
  /** @prop Optional initial provenance category */
  @property({ type: String }) term: undefined | string;

  /** @prop Optional initial provenance target */
  @property({ type: String }) target: undefined | string;

  private handleTermChange(term: ProvenanceRestriction.term) {
    this.dispatchEvent(
      new CustomEvent('bldn-provenance-restriction:term-change', {
        bubbles: true,
        composed: true,
        detail: {
          term,
        },
      })
    );
  }

  private handleTargetChange(target: ProvenanceRestriction.target) {
    this.dispatchEvent(
      new CustomEvent('bldn-provenance-restriction:target-change', {
        bubbles: true,
        composed: true,
        detail: {
          target,
        },
      })
    );
  }

  render() {
    return html`
      <p>${msg('My demand applies to data from the following provenance:')}</p>
      <fieldset class="provenance-restriction">
        ${Object.values(ProvenanceRestriction.term).map(
          term => html`
            <input
              id=${term}
              name='provenance-term'
              type='radio'
              ?checked=${this.term === term}
              @click=${() => this.handleTermChange(term)}>
            </input>
            <label for=${term}>${PROVENANCE_DESCRIPTIONS[term]()}</label><br/>
          `
        )}
      </fieldset>
    `;

    // NOTE: Until (if) we support multiple demand groups per request, we only need to allow setting target on the whole request
    //
    // <p> ${msg('I address my demand to:')} </p>
    // <fieldset class="provenance-restriction">
    //   ${Object.values(ProvenanceRestriction.target)
    //     .map(
    //       target => html`
    //         <input
    //           id=${target}
    //           name='provenance-target'
    //           type='radio'
    //           ?checked=${this.target === target}
    //           @click=${() => this.handleTargetChange(target)}>
    //         </input>
    //         <label for=${target}>${TARGET_DESCRIPTIONS[target]()}</label><br/>
    //       `
    //     )}
    // </fieldset>
  }

  static styles = css`
    :host {
      display: block;
      text-align: left;
    }

    fieldset {
      border: none;
      margin: 0;
      padding: 0em;
      text-align: left;
    }

    input ~ input {
      margin-top: 1em;
    }
  `;
}
