import { msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { ComputationAPI } from '../computation/computation-api.js';
import {
  PendingDemandDetailsPayload,
  PendingDemandPayload,
  Recommendation,
} from '../computation/generated-models/index.js';

// import {
//   PendingDemandPayload,
//   PendingDemandDetailsPayload,
//   Recommendation,
// } from '../index.js';

import { bldnStyles } from './blindnet-wc-styles.js';

@customElement('bldn-data-consum-demand-list-item')
export class DataConsumerDemandListItem extends LitElement {
  @property({ type: Object }) demand: PendingDemandPayload | undefined;

  @state() _demandDetails: PendingDemandDetailsPayload | undefined;

  @state() _open = false;

  @state() _dropdownUiState: 'respond' | 'history' = 'respond';

  @state() _selectedResponseType: Recommendation.status | undefined = undefined;

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('demand') && this.demand) {
      ComputationAPI.getInstance()
        .getPendingDemandDetails(this.demand.id)
        .then(details => {
          this._demandDetails = details;
          if (this._demandDetails!.recommendation?.status) {
            this._selectedResponseType =
              this._demandDetails!.recommendation?.status;
          }
        });
    }
  }

  handleDropdownToggleChange(e: CustomEvent) {
    const { newValue } = e.detail;
    this._dropdownUiState = (newValue as string).toLowerCase() as
      | 'respond'
      | 'history';
  }

  handleSubmitClick() {
    // switch (this._selectedResponseType) {
    //   case RecommendationStatusEnum.:
    //     break;
    //   default:
    //     break;
    // }
  }

  // Uses inline SVGs so we can adjust the colour
  render() {
    return html`
      ${when(
        this.demand !== undefined,
        () => html`
          <div id="list-item">
            <span class="list-item__text"
              >${new Date(this.demand!.date).toLocaleDateString('en-gb')}</span
            >
            <span class="list-item__text"
              >${this.demand!.data_subject?.id}</span
            >
            <span class="list-item__text">${this.demand!.action}</span>
            <button
              id="list-item__expand-btn"
              class="svg-btn"
              @click=${() => {
                this._open = !this._open;
              }}
            >
              ${when(
                this._open,
                () => html`
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.12 20.5469L16 14.4402L9.88 20.5469L8 18.6669L16 10.6669L24 18.6669L22.12 20.5469Z"
                    />
                  </svg>
                `,
                () => html`
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.88 11.4531L16 17.5598L22.12 11.4531L24 13.3331L16 21.3331L8 13.3331L9.88 11.4531Z"
                    />
                  </svg>
                `
              )}
            </button>
          </div>

          ${when(
            this._open,
            () => html`
              <div id="dropdown">
                <bldn-toggle-button
                  left="Respond"
                  right="History"
                  @bldn-toggle-button-change=${this.handleDropdownToggleChange}
                ></bldn-toggle-button>
                ${when(
                  this._dropdownUiState === 'respond',
                  () => html`
                    <div id="dropdown__response-ctr">
                      <span id="dropdown__response-heading"
                        >${msg('Response')}</span
                      >
                      <textarea
                        placeholder=${msg('Response details ')}
                      ></textarea>
                      <div id="dropdown__response-btns">
                        <button
                          class="response-btn response-btn--grant ${this
                            ._selectedResponseType ===
                          Recommendation.status.GRANTED
                            ? 'response-btn--selected'
                            : ''}"
                          @click=${() => {
                            this._selectedResponseType =
                              Recommendation.status.GRANTED;
                          }}
                        >
                          ${when(
                            this._selectedResponseType ===
                              Recommendation.status.GRANTED,
                            () => html`
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                                />
                              </svg>
                            `,
                            () => html`
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                                />
                              </svg>
                            `
                          )}
                          <span>${msg('Grant')}</span>
                        </button>
                        <button
                          class="response-btn response-btn--partial ${this
                            ._selectedResponseType ===
                          Recommendation.status.PARTIALLY_GRANTED
                            ? 'response-btn--selected'
                            : ''}"
                          @click=${() => {
                            this._selectedResponseType =
                              Recommendation.status.PARTIALLY_GRANTED;
                          }}
                        >
                          ${when(
                            this._selectedResponseType ===
                              Recommendation.status.PARTIALLY_GRANTED,
                            () => html`
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                                />
                              </svg>
                            `,
                            () => html`
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                                />
                              </svg>
                            `
                          )}
                          <span>${msg('Partially Grant')}</span>
                        </button>
                        <button
                          class="response-btn response-btn--deny ${this
                            ._selectedResponseType ===
                          Recommendation.status.DENIED
                            ? 'response-btn--selected'
                            : ''}"
                          @click=${() => {
                            this._selectedResponseType =
                              Recommendation.status.DENIED;
                          }}
                        >
                          ${when(
                            this._selectedResponseType ===
                              Recommendation.status.DENIED,
                            () => html`
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                                />
                              </svg>
                            `,
                            () => html`
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                                />
                              </svg>
                            `
                          )}
                          <span>${msg('Deny')}</span>
                        </button>
                      </div>
                    </div>
                    <bldn-button>${msg('Submit')}</bldn-button>
                  `,
                  () => html` History view coming soon! `
                )}
              </div>
            `
          )}
        `
      )}
    `;
  }

  static styles = [
    bldnStyles,
    css`
      #list-item {
        display: grid;
        grid-template-columns: repeat(3, 2fr) 1fr;
        border: 1px solid var(--color-light);
        border-radius: 5px;
      }

      .list-item__text {
        padding: 20px 0px;
      }

      #list-item__expand-btn {
        border: none;
        border-left: 1px solid var(--color-light);
      }

      #list-item__expand-btn svg {
        fill: var(--color-primary);
      }

      #dropdown {
        display: flex;
        margin-top: -5px;
        padding: 2vh 0vw;
        row-gap: 2vh;
        flex-direction: column;
        align-items: center;
        border: 1px solid var(--color-light);
        border-width: 0px 1px 1px 1px;
        border-radius: 0px 0px 20px 20px;
      }

      #dropdown__response-ctr {
        width: 75%;
        text-align: left;
      }

      #dropdown bldn-toggle-button {
        width: 200px;
      }

      #dropdown__response-heading {
        color: var(--color-dark);
        padding: 0px 0px 0px 5px;
        font-size: 14px;
      }

      #dropdown textarea {
        display: block;
        box-sizing: border-box;
        height: 10vh;
        width: 100%;
        margin: 3px 0px 0px 0px;
        padding: 5px;
        border: 1px solid var(--color-light);
        border-bottom: none;
        border-radius: 5px 5px 0px 0px;
      }

      #dropdown__response-btns {
        width: 100%;
        display: flex;
        width: 100%;
      }

      .response-btn {
        display: flex;
        width: 100%;
        padding: 5px;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--color-light);
        column-gap: 3px;
      }

      .response-btn--grant {
        color: var(--color-positive);
        border-radius: 0px 0px 0px 5px;
      }

      .response-btn--partial {
        color: var(--color-warning);
        border-radius: 0px;
      }

      .response-btn--deny {
        color: var(--color-negative);
        border-radius: 0px 0px 5px 0px;
      }

      .response-btn--selected {
        /* background-color: var(--color-light); */
        border-color: var(--color-primary);
        background: linear-gradient(
            0deg,
            rgba(var(--color-primary-rgb), 0.1),
            rgba(var(--color-primary-rgb), 0.1)
          ),
          #ffffff;
      }
    `,
  ];
}
