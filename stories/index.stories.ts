import { html, TemplateResult } from 'lit';
import '../src/bldn-priv-request.js';

export default {
  title: 'BldnPrivRequest',
  component: 'bldn-priv-request',
  argTypes: {
    actions: {
      control: 'text',
      description:
        'JSON list of [actions](https://github.com/blindnet-io/product-management/blob/main/refs/schemas/priv/json-schema/priv-terms.schema.json) to include in the component.',
    },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  actions?: string;
}

const Template: Story<ArgTypes> = ({ actions }: ArgTypes) => html`
  <bldn-priv-request actions="${actions || ''}" lang="fr"></bldn-priv-request>
`;

export const Regular = Template.bind({});

export const CustomActions = Template.bind({});
CustomActions.args = {
  actions: '["ACCESS","DELETE","TRANSPARENCY"]',
};
