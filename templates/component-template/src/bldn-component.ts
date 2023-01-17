import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { property } from 'lit/decorators/property.js';

/**
 * Here is a description of my web component.
 * 
 * @element my-element
 * 
 * @fires change - This jsdoc tag makes it possible to document events.
 * @fires submit
 * 
 * @attr {Boolean} disabled - This jsdoc tag documents an attribute.
 * @attr {on|off} switch - Here is an attribute with either the "on" or "off" value.
 * @attr [my-attr=default value]
 * 
 * @prop {String} myProp - You can use this jsdoc tag to document properties.
 * @prop value
 * 
 * @slot - This is an unnamed slot (the default slot)
 * @slot start - This is a slot named "start".
 * @slot end
 * 
 * @cssprop --main-bg-color - This jsdoc tag can be used to document css custom properties.
 * @cssprop [--main-color=red]

 * @csspart container 
 */
@customElement('bldn-component-template')
export class BldnComponent extends LitElement {
  /** @type {string} Description for myProperty. */
  @property({ type: String, attribute: 'my-property' }) myProperty:
    | undefined
    | string;

  /**
   * Documentation of this awesome method.
   * @param {String} foo - Docs for foo.
   * @param {Boolean} bar - Docs for bar.
   */
  publicMethod(foo, bar) {
    // Do something
  }

  // Private method documentation
  _privateMethod() {
    // Do stuff
  }

  // If you need to hook some code when a property changes (before the render)
  // It's often needed when you have a private property that depends on a public property
  willUpdate(changeProperties) {}

  // If you need to setup some code before the first render, use this.
  // It's often needed if your component contains DOM managed by a 3rd party (chart, map...).
  firstUpdated() {
    // Do something
  }

  // If you need to hook some code when a property changes (after the render)
  // Use this one instead of update when you have a "firstUpdated"
  updated(changeProperties) {
    // Do something
  }

  render() {
    return html``;
  }

  static styles = [
    // Add any imported external styles (e.g. bldnStyles) here as a list element
    css``,
  ];
}
