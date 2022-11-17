import { localized } from '@lit/localize';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { setLocale } from './localization.js';

@localized()
@customElement('bldn-data-consum-alerts')
export class DataConsumerAlerts extends LitElement {
  constructor() {
    super();

    // Set locale if current one is supported
    try {
      setLocale(navigator.language);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Could not set locale to ${navigator.language}.`);
    }
  }

  render() {
    return html`Alerts view coming soon!`;
  }
}
