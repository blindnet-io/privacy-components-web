/* eslint-disable lit/binding-positions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
import { html, css, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { when } from 'lit/directives/when.js';
import { map } from 'lit/directives/map.js';
import { localized, msg } from '@lit/localize';

import './FrequentRequestsMenu.js';
import './ResponseView.js';
import './ReviewView.js';
import './ActionMenu.js';
import './demand-forms/TransparencyForm.js';
import { ACTION, TARGET } from './models/priv-terms.js';
import { PrivacyRequest } from './models/privacy-request.js';
import { ComponentState } from './utils/states.js';
import { Demand } from './models/demand.js';
import { getDefaultActions } from './utils/utils.js';
import { buttonStyles, containerStyles, textStyles } from './styles.js';
import { PRCI_CONFIG } from './utils/conf.js';
import { TARGET_DESCRIPTIONS } from './utils/dictionary.js';

/**
 * Top level component encapsulating a single PrivacyRequest. Contains one or
 * more DemandBuilder elements, each for a single demand action type.
 */
@customElement('bldn-priv-request')
@localized()
export class BldnPrivRequest extends LitElement {
  // JSON string of actions to display
  @property({ type: String, attribute: 'actions' }) actions = '';

  // Array of actions, given by actions attribute if a valid list was passed, otherwise includes the 9 defaults
  @state() _includedActions: ACTION[] = getDefaultActions();

  // State of the PRCI component
  @state() _componentState: ComponentState = ComponentState.MENU;

  // Currently selected action
  @state() _selectedAction: ACTION = ACTION.TRANSPARENCY;

  // Privacy request object, empty until some demands are added
  @state() _privacyRequest: PrivacyRequest = {
    demands: [],
    data_subject: [
      {
        // FIXME: For now we hardcode this, but will come from token once auth added
        id: 'fdfc95a6-8fd8-4581-91f7-b3d236a6a10e',
        schema: 'dsid',
      },
    ],
    email: '',
    target: TARGET.PARTNERS,
  };

  // Map of demand group ids to sets of demands
  @state() _demands: Map<string, Demand[]> = new Map<string, Demand[]>();

  @state() _currentDemandGroupId: string = '';

  constructor() {
    super();

    // Initialize demands and current demand group to the same uuid
    const initialGroup = self.crypto.randomUUID();
    this._demands.set(initialGroup, []);
    this._currentDemandGroupId = initialGroup;

    // State change listener
    this.addEventListener('component-state-change', e => {
      const details = (e as CustomEvent).detail;
      this._componentState = details.newState;

      switch (this._componentState) {
        case ComponentState.EDIT:
          this._selectedAction = details.newAction;
          if (details.demandGroupId !== undefined) {
            this._currentDemandGroupId = details.demandGroupId;
          }
          break;
        case ComponentState.SUBMITTED:
          break;
        default:
          break;
      }
    });

    // Demand update listener
    this.addEventListener('demand-set-multiple', e => {
      const { demandGroupId, demands } = (e as CustomEvent).detail;
      this._demands.set(demandGroupId, demands);
    });
    this.addEventListener('demand-delete', e => {
      const { demandGroupId } = (e as CustomEvent).detail;
      this._demands.delete(demandGroupId);
      this.requestUpdate();
    });
  }

  static styles = [
    buttonStyles,
    textStyles,
    containerStyles,
    css`
      :host {
        display: grid;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16;
        max-width: 1350px;
        background-color: white;
        padding: 30px;
      }

      :host button {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }

      :host p {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        margin: 0px;
      }

      :host span {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }

      #priv-req-ctr {
        padding: 20px 0px 0px 0px;
      }

      #content-ctr {
        display: grid;
        row-gap: 30px;
        padding: 40px 60px 40px 60px;
      }

      #nav-bar {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        padding: 0px 0px 20px 0px;
      }

      #new-dmd-ctr {
        display: flex;
        column-gap: 10px;
        padding: 20px;
        align-items: center;
        justify-content: center;
      }

      #request-progress-indicator {
        background-color: red;
      }

      #frequent-requests {
        background-color: green;
      }

      #restart-btn {
        background: #fafafa;
        border: none;
        width: fit-content;
        height: fit-content;
        text-decoration: underline;
        margin: 20px 0px;
      }

      #req-sent-hdr {
        padding: 40px 0px;
      }

      #other-dmd-btn {
        margin: 20px 0px 0px 0px;
        float: right;
      }

      #submit-btn {
        transform: translateY(15px);
      }

      .req-hdr {
        font-weight: bold;
        font-size: 24px;
        text-align: center;
        grid-column: 2/3;
      }

      .new-dmd-btn {
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      button:disabled {
        /* background-color: #d9d9d9; */
        background-color: #a9d1ff;
      }

      .ctr-btn {
        justify-self: center;
      }

      .demand-builder-next-btn {
        grid-column: 2/3;
        padding-bottom: -50px;
        margin-bottom: -50px;
      }

      .ctr-txt {
        text-align: center;
      }
    `,
  ];

  handleSubmitClick() {
    const allDemands = Array.from(this._demands.values()).reduce(
      (dmds, dmdGroup) => dmds.concat(dmdGroup),
      []
    );
    this._privacyRequest.demands = allDemands.map((d, i) => {
      d.id = i.toString();
      return d;
    });

    // eslint-disable-next-line no-console
    console.log(this._privacyRequest);

    // sendPrivacyRequest(this._privacyRequest, false).then(response => {
    //   this.dispatchEvent(
    //     new CustomEvent('component-state-change', {
    //       detail: {
    //         newState: ComponentState.SUBMITTED,
    //         requestId: response.request_id,
    //       },
    //     })
    //   );
    // });
  }

  /**
   * Reset most states
   * // TODO: Remove this and use something like getDefaultDemand() from the forms
   */
  handleRestartClick() {
    this._privacyRequest = {
      demands: [],
      data_subject: [
        {
          // FIXME: For now we hardcode this, but will come from token once auth added
          id: 'fdfc95a6-8fd8-4581-91f7-b3d236a6a10e',
          schema: 'dsid',
        },
      ],
      email: '',
      target: TARGET.PARTNERS,
    };
    this._demands = new Map<string, Demand[]>();
  }

  handleTargetClick(e: Event) {
    const { id } = (e as CustomEvent).target as HTMLInputElement;
    this._privacyRequest.target = id as TARGET;
  }

  actionFormFactory(action: ACTION) {
    return html`
      ${choose(
        action,
        [
          [ACTION.ACCESS, () => html``],
          [ACTION.DELETE, () => html``],
          [ACTION.MODIFY, () => html``],
          [ACTION.OBJECT, () => html``],
          [ACTION.PORTABILITY, () => html``],
          [ACTION.RESTRICT, () => html``],
          [ACTION.REVOKE, () => html``],
          [
            ACTION.TRANSPARENCY,
            () => html`<transparency-form
              .demandGroupId=${this._currentDemandGroupId}
              .demands=${this._demands.get(this._currentDemandGroupId)}
            ></transparency-form>`,
          ],
          [ACTION['OTHER.DEMAND'], () => html``],
        ],
        () => html`${msg('Error: Invalid Action')}`
      )}
    `;
  }

  // Hook into willUpdate lifecycle method to set the included actions state if a valid list of actions is passed as an attribute
  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has('actions') && this.actions) {
      try {
        const actionsList = (
          Array.from(JSON.parse(this.actions)) as string[]
        ).map(a => a.toLocaleLowerCase());
        const validActionsList = getDefaultActions().filter(a =>
          actionsList.includes(a.toLocaleLowerCase())
        );
        // If a valid list of actions has been passed, use it
        if (validActionsList.length > 0) {
          this._includedActions = validActionsList;
        }
      } catch {
        this._includedActions = getDefaultActions();
      }
    }
  }

  render() {
    return html`
      <div id="priv-req-ctr">
        <!-- Heading -->
        <div id="nav-bar">
          <span class="req-hdr">${msg('My Privacy Request')}</span>
        </div>
        <!-- Main View -->
        <div id="content-ctr" class="medium-border">
          ${choose(this._componentState, [
            [
              ComponentState.MENU,
              () => html`
                <action-menu
                  .includedActions=${this._includedActions}
                ></action-menu>
              `,
            ],
            [
              ComponentState.EDIT,
              () => this.actionFormFactory(this._selectedAction),
            ],
            [
              ComponentState.REVIEW,
              () => html`
                <span><b>${msg('My demand(s):')}</b></span>
                ${map(
                  this._demands.entries(),
                  ([groupId, demands]) => html`<review-view
                    class="medium-border"
                    .demandGroupId=${groupId}
                    .demands=${demands}
                  ></review-view>`
                )}
                <!-- Uncomment when supporting multiple demands -->
                <!-- <div id="new-dmd-ctr" class="medium-border">
                  <span><b>${msg('I want to add another demand')}</b></span>
                  <button class="svg-btn">
                    <img src="packages/prci/src/assets/icons/add-circle.svg" alt="add icon"></img>
                  </button>
                </div> -->
                <!-- Submit button -->
                <slotted-dropdown
                  header=${msg('Advanced settings')}
                  include-buttons
                >
                  <div>
                    <span> ${msg('I address my Privacy Request to:')} </span>
                    <fieldset class="provenance-restriction">
                      ${Object.values(TARGET)
                        .filter(t => t !== TARGET.ALL)
                        .map(
                          t => html`
                          <input
                            id=${t}
                            name='provenance-target'
                            type='radio'
                            ?checked=${this._privacyRequest.target === t}
                            @click=${this.handleTargetClick}>
                          </input>
                          <label for=${t}>${TARGET_DESCRIPTIONS[
                            t
                          ]()}</label><br/>
                        `
                        )}
                    </fieldset>
                  </div>
                </slotted-dropdown>
                <button
                  id="submit-btn"
                  class="nav-btn ctr-btn"
                  @click=${this.handleSubmitClick}
                >
                  ${msg('Submit Privacy Request')}
                </button>
              `,
            ],
            [
              ComponentState.REQUESTS,
              () => html` <requests-view></requests-view> `,
            ],
            [
              ComponentState.SUBMITTED,
              () => html`
                <p class="ctr-txt">
                  <b>${msg('Your Privacy Request has been sent!')} 🎉</b>
                </p>
                <p class="ctr-txt">
                  ${msg('You may track the status of your request below.')}
                </p>
              `,
            ],
            [ComponentState.AUTH, () => html` <auth-view></auth-view> `],
          ])}
        </div>
        <!-- Other Demand Option -->
        ${when(
          this._componentState === ComponentState.MENU &&
            this._includedActions.includes(ACTION['OTHER.DEMAND']),
          () => html`
            <button id="other-dmd-btn" class="link-btn medium-font underline">
              ${msg(
                'Click here if you want to make some other demand (please note that it might take longer to be answered)'
              )}
            </button>
          `
        )}
      </div>
    `;
  }
}
