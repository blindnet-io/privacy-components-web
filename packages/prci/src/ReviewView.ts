import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators';
import { Demand } from './models/demand.js';

@customElement('review-view')
export class ReviewView extends LitElement {
  /**
   * 1.
   */

  @property({ attribute: false }) demands = new Map<string, Demand[]>();

  getReviewContainerTemplate() {
    /**
     * Should contain:
     * - Review based on demand type
     * - Button for edit/delete
     */
  }

  render() {
    // TODO: Map each demand group to a review container template
    return html``;
  }
}
