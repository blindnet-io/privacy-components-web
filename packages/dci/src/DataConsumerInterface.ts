import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators';

@customElement('bldn-data-consum')
export class DataConsumerInterface extends LitElement {
  render() {
    return html`Hello Data Consumer!`;
  }
}
