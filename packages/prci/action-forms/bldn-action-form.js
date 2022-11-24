import { __decorate } from '../node_modules/tslib/tslib.es6.js';
import { msg } from '@lit/localize';
import { css, LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import '../bldn-nav-wrapper.js';
import '../bldn-dropdown.js';
import { when } from 'lit/directives/when.js';
import { ACTION_TITLES_WITH_DEMAND } from '../utils/dictionary.js';

/**
 * Abstract class for a form that allows the user to create or edit a demand.
 */
class ActionForm extends LitElement {
    constructor() {
        super(...arguments);
        /** @prop */
        this.demands = this.getDefaultDemands();
        /** Indicates that there is an error in the form input */
        this.hasError = false;
        this.includeOptions = true;
    }
    /**
     * Send a demand group up to the request builder
     * @param demandGroupIndex index of the demand group to replace. If undefined,
     * will be treated as a new group of demands.
     * @param demand demands to add
     */
    addToPrivacyRequest(demandGroupIndex, demands) {
        this.dispatchEvent(new CustomEvent('bldn-action-form:set-demands', {
            bubbles: true,
            composed: true,
            detail: {
                demandGroupIndex,
                demands,
            },
        }));
    }
    handleBackClick() {
        this.dispatchEvent(new Event('bldn-action-form:back-click', {
            bubbles: true,
            composed: true,
        }));
    }
    /**
     * Validate and add demand to request when add clicked
     */
    handleAddClick() {
        // If form input is valid, add demands and emit event.
        // Otherwise, error messages will be set.
        if (this.validate()) {
            this.addToPrivacyRequest(this.demandGroupIndex, this.demands);
            this.dispatchEvent(new CustomEvent('bldn-action-form:next-click', {
                bubbles: true,
                composed: true,
            }));
        }
    }
    /**
     * Validate data entered and provide error message
     * @return Boolean indicating if the input is valid and if it is not valid, an error message.
     */
    validate() {
        this.mainInputErrorMessage = this.validateActionInput();
        this.optionsInputErrorMessage = this.validateOptionsInput();
        return (this.mainInputErrorMessage === undefined &&
            this.optionsInputErrorMessage === undefined);
    }
    render() {
        return html `
      <bldn-nav-wrapper
        left-button=${msg('Back')}
        right-button=${msg('Next')}
        @bldn-nav-wrapper:left-click=${this.handleBackClick}
        @bldn-nav-wrapper:right-click=${this.handleAddClick}
      >
        <bldn-dropdown class="main-section" mode="major" open>
          <span slot="heading"
            ><strong
              >${msg('Details of my', {
            id: 'demand-form-action-sentence-start',
        })}
              ${ACTION_TITLES_WITH_DEMAND[this.action]()}
            </strong></span
          >
          ${this.getFormTemplate()}
        </bldn-dropdown>
        ${when(this.includeOptions, () => html `
            <bldn-dropdown class="main-section" mode="major">
              <span slot="heading"
                ><strong>${msg('Other Options')}</strong></span
              >
              ${this.getOptionsTemplate()}
            </bldn-dropdown>
          `)}
      </bldn-nav-wrapper>
    `;
    }
}
ActionForm.styles = [
    css `
      :host {
        /* display: block; */
        width: 100%;
        margin: 0px;
      }

      bldn-dropdown.main-section {
        border: 2px solid
          var(--bldn-action-form-section-border-color, var(--color-light));
        border-radius: 20px;
        padding: 2.5em;
        /* FIXME: This makes the border expansion jump weird */
        /* transition: 0.3s ease-out; */
      }

      bldn-dropdown.main-section[open] {
        padding: 2.5em 2.5em 0.5em 2.5em;
      }

      bldn-dropdown.main-section:hover {
        border: 2px solid
          var(
            --bldn-action-form-section-border-color-hovered,
            var(--color-dark)
          );
        /* FIXME: This makes the border expansion jump weird */
        /* transition: 0.3s ease; */
      }

      /* Font for main sections: Demand Details and Other Options */
      bldn-dropdown.main-section > span {
        font-size: var(
          --bldn-action-form-section-heading-font-size,
          var(--font-size-medium)
        );
        color: var(
          --bldn-action-form-section-heading-font-color,
          var(--color-dark)
        );
      }

      /* Padding in each other option dropdown */
      bldn-dropdown bldn-dropdown[open] {
        padding-bottom: 1.875em;
      }

      /* Font for other options headings */
      bldn-dropdown bldn-dropdown span {
        font-size: var(--font-size-small);
        color: var(
          --bldn-action-form-subsection-heading-font-color,
          var(--color-dark)
        );
      }

      bldn-dropdown bldn-dropdown span ~ * {
        padding-left: 1.25em;
      }

      /* Divider between other options dropdowns */
      bldn-dropdown {
        border-bottom: 2px solid
          var(
            --bldn-action-form-subsection-divider-color,
            var(--color-lightest)
          );
      }

      /* Last dropdown in other options should have no border */
      bldn-dropdown bldn-dropdown:last-child {
        border-bottom: none;
      }

      bldn-nav-wrapper {
        padding: 2.813em 2.813em 0em 2.813em;
      }
    `,
];
__decorate([
    property({ type: Number, attribute: 'demand-group-index' })
], ActionForm.prototype, "demandGroupIndex", void 0);
__decorate([
    property({ type: Array, attribute: 'demands' })
], ActionForm.prototype, "demands", void 0);
__decorate([
    state()
], ActionForm.prototype, "hasError", void 0);
__decorate([
    state()
], ActionForm.prototype, "mainInputErrorMessage", void 0);
__decorate([
    state()
], ActionForm.prototype, "optionsInputErrorMessage", void 0);

export { ActionForm };
//# sourceMappingURL=bldn-action-form.js.map
