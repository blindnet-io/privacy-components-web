import { msg } from '@lit/localize';
import { css, html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { ComputationAPI } from '../computation/computation-api.js';
import {
  PendingDemandDetailsPayload,
  PendingDemandPayload,
  Recommendation,
} from '../models/generated-models/index.js';
import { ACTION_TITLES } from '../language/dictionary.js';

import { bldnStyles } from './bldn-styles.js';

enum DropdownUIState {
  Respond,
  History,
  Responded,
}

@customElement('bldn-data-consum-demand-list-item')
export class DataConsumerDemandListItem extends LitElement {
  @property({ type: Object }) demand: PendingDemandPayload | undefined;

  @state() _demandDetails: PendingDemandDetailsPayload | undefined;

  @state() _open = false;

  @state() _dropdownUiState: DropdownUIState = DropdownUIState.Respond;

  @state() _selectedResponseType: Recommendation.status | undefined = undefined;

  @state() _message: string = '';

  isRecommended(): boolean {
    return (
      this._selectedResponseType === this._demandDetails?.recommendation?.status
    );
  }

  handleDropdownToggleChange(e: CustomEvent) {
    const { newValue } = e.detail;
    this._dropdownUiState =
      newValue === 'History'
        ? DropdownUIState.History
        : DropdownUIState.Respond;
  }

  handleMessageInput(e: Event) {
    const { value } = e.target as HTMLTextAreaElement;
    this._message = value;
  }

  handleSubmitClick() {
    switch (this._selectedResponseType) {
      case Recommendation.status.GRANTED:
        ComputationAPI.getInstance()
          .grantDemand(this.demand!.id, this._message)
          .then(() => {
            this._dropdownUiState = DropdownUIState.Responded;
          });
        break;
      case Recommendation.status.PARTIALLY_GRANTED:
        break;
      case Recommendation.status.DENIED:
        ComputationAPI.getInstance()
          .denyDemand(
            this.demand!.id,
            Recommendation.motive.OTHER_MOTIVE,
            this._message
          )
          .then(() => {
            this._dropdownUiState = DropdownUIState.Responded;
          });
        break;
      default:
        break;
    }
  }

  // Uses inline SVGs so we can adjust the colour
  getRadioSVG(selected: boolean) {
    return selected
      ? html`
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
        `
      : html`
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
        `;
  }

  // Uses inline SVGs so we can adjust the colour
  getArrowSVG(type: 'open' | 'close') {
    return type === 'open'
      ? html`
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
        `
      : html`
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
        `;
  }

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

  render() {
    // List of status, css class, and display message objects for each response option
    const responseStatusOptions: {
      respStatus: Recommendation.status;
      class: string;
      display: string;
    }[] = [
      {
        respStatus: Recommendation.status.GRANTED,
        class: 'grant',
        display: msg('Grant'),
      },
      // {respStatus: Recommendation.status.PARTIALLY_GRANTED, class: 'partial', display: msg('Partially Grant')},
      {
        respStatus: Recommendation.status.DENIED,
        class: 'deny',
        display: msg('Deny'),
      },
    ];

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
            <span class="list-item__text"
              >${ACTION_TITLES[this.demand!.action]()}</span
            >
            <button
              id="list-item__expand-btn"
              class="svg-btn"
              @click=${() => {
                this._open = !this._open;
              }}
            >
              ${this.getArrowSVG(this._open ? 'open' : 'close')}
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
                ${choose(this._dropdownUiState, [
                  [
                    DropdownUIState.Respond,
                    () => html`
                      <div id="dropdown__response-ctr">
                        <span id="dropdown__response-heading"
                          >${msg('Response')}
                          -${when(
                            this.isRecommended(),
                            () => html`
                              <span
                                id="dropdown__response-heading--recommended"
                              >
                                ${msg('Recommended')}
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6 1C3.24 1 1 3.24 1 6C1 8.76 3.24 11 6 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 6 1ZM5 8.5L2.5 6L3.205 5.295L5 7.085L8.795 3.29L9.5 4L5 8.5Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            `,
                            () => html`
                              <span
                                id="dropdown__response-heading--not-recommended"
                              >
                                ${msg('Not Recommended')}
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6 1C3.235 1 1 3.235 1 6C1 8.765 3.235 11 6 11C8.765 11 11 8.765 11 6C11 3.235 8.765 1 6 1ZM8.5 7.795L7.795 8.5L6 6.705L4.205 8.5L3.5 7.795L5.295 6L3.5 4.205L4.205 3.5L6 5.295L7.795 3.5L8.5 4.205L6.705 6L8.5 7.795Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            `
                          )}</span
                        >
                        <textarea
                          placeholder=${msg('Optional Message')}
                          @input=${this.handleMessageInput}
                        ></textarea>
                        <div id="dropdown__response-btns">
                          ${map(
                            responseStatusOptions,
                            option => html`
                              <button
                                class="response-btn response-btn--${option.class} ${this
                                  ._selectedResponseType === option.respStatus
                                  ? 'response-btn--selected'
                                  : ''}"
                                @click=${() => {
                                  this._selectedResponseType =
                                    option.respStatus;
                                }}
                              >
                                ${this.getRadioSVG(
                                  this._selectedResponseType ===
                                    option.respStatus
                                )}
                                <span>${option.display}</span>
                              </button>
                            `
                          )}
                        </div>
                      </div>
                      <bldn-button @click=${this.handleSubmitClick}
                        >${msg('Submit')}</bldn-button
                      >
                    `,
                  ],
                  [
                    DropdownUIState.History,
                    () => html`${msg('History view coming soon!')}`,
                  ],
                  [
                    DropdownUIState.Responded,
                    () => html`${msg('Response Submmitted')} 📨`,
                  ],
                ])}
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
      :host textarea {
        font-family: var(
          --bldn-font-family,
          -apple-system,
          BlinkMacSystemFont,
          'Segoe UI',
          Roboto,
          Oxygen,
          Ubuntu,
          Cantarell,
          'Open Sans',
          'Helvetica Neue',
          sans-serif
        );
      }

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
        border-radius: 0px 5px 5px 0px;
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

      #dropdown__response-heading--recommended {
        display: inline-flex;
        align-items: center;
        color: var(--color-positive);
        column-gap: 3px;
      }

      #dropdown__response-heading--not-recommended {
        display: inline-flex;
        align-items: center;
        color: var(--color-negative);
        column-gap: 3px;
      }

      #dropdown textarea {
        display: block;
        box-sizing: border-box;
        height: 7.5vh;
        width: 100%;
        margin: 3px 0px 0px 0px;
        padding: 5px;
        border: 1px solid var(--color-light);
        border-bottom: none;
        border-radius: 5px 5px 0px 0px;
        resize: none;
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
