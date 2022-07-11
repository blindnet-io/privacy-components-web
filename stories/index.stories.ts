import { html, TemplateResult } from 'lit';
import '../src/bldn-priv-request.js';

export default {
  title: 'BldnPrivRequest',
  component: 'bldn-priv-request',
  argTypes: {
    excludeActions: {
      control: 'text',
      description: 'Comma-seperated list of actions to exclude from the menu',
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  excludeActions?: string;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({ excludeActions, slot }: ArgTypes) => html`
  <bldn-priv-request exclude-actions="${excludeActions || ''}">
    ${slot}
  </bldn-priv-request>
`;

export const Regular = Template.bind({});

export const CustomExcludeActions = Template.bind({});
CustomExcludeActions.args = {
  excludeActions: 'access',
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
