import { __decorate } from './node_modules/tslib/tslib.es6.js';
import { css, LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

let BldnBadge = class BldnBadge extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * @prop neutral - Badge should have a neutral (non-colored) display
         *
         * This prop takes priority over the others if multiple are set.
         */
        this.neutral = false;
        /** @prop info - Badge should indicate some info */
        this.info = false;
        /** @prop success - Badge should indicate success */
        this.success = false;
        /** @prop warning - Badge should indicate a warning */
        this.warning = false;
        /** @prop danger - Badge should indicate danger */
        this.danger = false;
    }
    render() {
        // Decide class, will default to neutral if
        const classes = {
            neutral: this.neutral ||
                (!this.neutral &&
                    !this.info &&
                    !this.success &&
                    !this.warning &&
                    !this.danger),
            info: !this.neutral &&
                this.info &&
                !this.success &&
                !this.warning &&
                !this.danger,
            success: !this.neutral &&
                !this.info &&
                this.success &&
                !this.warning &&
                !this.danger,
            warning: !this.neutral &&
                !this.info &&
                !this.success &&
                this.warning &&
                !this.danger,
            danger: !this.neutral &&
                !this.info &&
                !this.success &&
                !this.warning &&
                this.danger,
        };
        return html `
      <span class="badge ${classMap(classes)}">
        <slot></slot>
      </span>
    `;
    }
};
BldnBadge.styles = css `
    :host {
      display: inline-block;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.2em 0.8em;
      border-radius: 1em;
      color: var(--bldn-badge-font-color, var(--color-darkest));
    }

    .neutral {
      background-color: var(--bldn-badge-neutral-color, var(--color-light));
    }

    .info {
      background-color: var(--bldn-badge-info-color, var(--color-primary));
    }

    .success {
      background-color: var(--bldn-badge-success-color, var(--color-positive));
    }

    .warning {
      background-color: var(--bldn-badge-warning-color, var(--color-warning));
    }

    .danger {
      border: 1px solid var(--bldn-badge-danger-color, var(--color-negative));
      background-color: rgba(
        var(--bldn-badge-danger-color-rgb, var(--color-negative-rgb)),
        0.2
      );
    }
  `;
__decorate([
    property({ type: Boolean })
], BldnBadge.prototype, "neutral", void 0);
__decorate([
    property({ type: Boolean })
], BldnBadge.prototype, "info", void 0);
__decorate([
    property({ type: Boolean })
], BldnBadge.prototype, "success", void 0);
__decorate([
    property({ type: Boolean })
], BldnBadge.prototype, "warning", void 0);
__decorate([
    property({ type: Boolean })
], BldnBadge.prototype, "danger", void 0);
BldnBadge = __decorate([
    customElement('bldn-badge')
], BldnBadge);

export { BldnBadge };
//# sourceMappingURL=bldn-badge.js.map
