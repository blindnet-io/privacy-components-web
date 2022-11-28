import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

@customElement('bldn-badge')
export class BldnBadge extends LitElement {
  /**
   * @prop neutral - Badge should have a neutral (non-colored) display
   *
   * This prop takes priority over the others if multiple are set.
   */
  @property({ type: Boolean }) neutral: boolean = false;

  /** @prop info - Badge should indicate some info */
  @property({ type: Boolean }) info: boolean = false;

  /** @prop success - Badge should indicate success */
  @property({ type: Boolean }) success: boolean = false;

  /** @prop warning - Badge should indicate a warning */
  @property({ type: Boolean }) warning: boolean = false;

  /** @prop danger - Badge should indicate danger */
  @property({ type: Boolean }) danger: boolean = false;

  render() {
    // Decide class, will default to neutral if
    const classes = {
      neutral:
        this.neutral ||
        (!this.neutral &&
          !this.info &&
          !this.success &&
          !this.warning &&
          !this.danger),
      info:
        !this.neutral &&
        this.info &&
        !this.success &&
        !this.warning &&
        !this.danger,
      success:
        !this.neutral &&
        !this.info &&
        this.success &&
        !this.warning &&
        !this.danger,
      warning:
        !this.neutral &&
        !this.info &&
        !this.success &&
        this.warning &&
        !this.danger,
      danger:
        !this.neutral &&
        !this.info &&
        !this.success &&
        !this.warning &&
        this.danger,
    };

    return html`
      <span class="badge ${classMap(classes)}">
        <slot></slot>
      </span>
    `;
  }

  static styles: CSSResultGroup | undefined = css`
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
      background-color: var(--bldn-badge-danger-color, var(--color-negative));
    }
  `;
}
