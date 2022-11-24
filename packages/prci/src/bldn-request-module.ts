import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('bldn-request-module')
export class BldnRequestModule extends LitElement {
  /**
   * Function that (optionally) queries the HTML content of the module and
   * returns a boolean indicating if the module is valid.
   *
   * Used to indicate if a request can move to the next step.
   */
  @property() isValid: () => boolean = () => true;

  /**
   * Indicates that this module should be skipped
   */
  @property({ type: Boolean }) skip: boolean = false;

  render() {
    // console.log('Rendering module!');
    // console.log(this.skip);
    if (this.skip) {
      return html`Module to skip`;
    }
    return html`Module!`;
  }
}
