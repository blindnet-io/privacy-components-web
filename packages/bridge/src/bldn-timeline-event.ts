import { PrivacyRequestEvent, PrivacyResponseEvent, GivenConsentEvent, RevokedConsentEvent, LegalBaseEvent } from "@blindnet/core";
import { html, LitElement, PropertyValueMap } from "lit"
import { customElement, property, state } from "lit/decorators.js";
import { when } from "lit/directives/when.js";

type TimelineEvent =
  | PrivacyRequestEvent
  | PrivacyResponseEvent
  | GivenConsentEvent
  | RevokedConsentEvent
  | LegalBaseEvent
  | { date: string; dateObj: Date };

// Below are 5 functions to use when determining which HTML template to render for an event
// NOTE: These are only correct when used in the order in getEventTemplate()

function isRequestEvent(event: TimelineEvent): event is PrivacyRequestEvent {
  if ((event as PrivacyRequestEvent).target) {
    return true;
  }
  return false;
}

function isResponseEvent(event: TimelineEvent): event is PrivacyResponseEvent {
  if ((event as PrivacyResponseEvent).action) {
    return true;
  }
  return false;
}

function isGivenConsentEvent(event: TimelineEvent): event is GivenConsentEvent {
  if ((event as GivenConsentEvent).scope) {
    return true;
  }
  return false;
}

function isRevokedConsentEvent(
  event: TimelineEvent
): event is RevokedConsentEvent {
  if ((event as RevokedConsentEvent).date) {
    return true;
  }
  return false;
}

function isLegalBaseEvent(event: TimelineEvent): event is LegalBaseEvent {
  if ((event as LegalBaseEvent).type) {
    return true;
  }
  return false;
}

const consentGivenIcon = new URL('./assets/consent-given.svg', import.meta.url)
  .href;

const consentRevokedIcon = new URL(
  './assets/consent-revoked.svg',
  import.meta.url
).href;

const legalBaseIcon = new URL('./assets/legal-base.svg', import.meta.url).href;

const requestSubmittedIcon = new URL(
  './assets/request-submitted.svg',
  import.meta.url
).href;

const responseDeniedIcon = new URL(
  './assets/response-denied.svg',
  import.meta.url
).href;

const responseGrantedIcon = new URL(
  './assets/response-granted.svg',
  import.meta.url
).href;

const expandEvenIcon = new URL(
  './assets/expand.svg',
  import.meta.url
).href;

const closeEventIcon = new URL(
  './assets/close.svg',
  import.meta.url
).href;

@customElement('bldn-timeline-event')
export class BldnTimelineEvent extends LitElement {

  @property({ type: Object }) event: undefined | TimelineEvent;
  
  // Goal: Move all timeline event code out of demand-list-item and into here
  @state() _type: undefined | 'request' | 'response' | 'consent-given' | 'consent-revoked' | 'legal-base';
  
  @state() _open: boolean = false;

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    // Narrow type of the event
    if (_changedProperties.has('event') && this.event) {
      if (isRequestEvent(this.event)) {
        this._type = 'request'
      } else if (isResponseEvent(this.event)) {
        this._type = 'response'
      } else if (isLegalBaseEvent(this.event)) {
        this._type = 'legal-base'
      } else if (isGivenConsentEvent(this.event)) {
        this._type = 'consent-given'
      } else if (isRevokedConsentEvent(this.event)) {
        this._type = 'consent-revoked'
      }
    }
  }

  getEventDetailsTemplate() {
    return html``
  }

  render() {
    return html`
      Date - Icon - Title - Dropdown Box here (Remember to switch icon based on this._open)
      ${when(this._open, () => html`
        ${this.getEventDetailsTemplate()}
      `)}
    `
  }

}