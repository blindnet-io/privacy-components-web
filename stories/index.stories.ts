import { html, TemplateResult } from 'lit';
import '../src/bldn-priv-request.js';

export default {
  title: 'BldnPrivRequest',
  component: 'bldn-priv-request',
  // argTypes: {
  //   includeActions: {
  //     control: 'text',
  //     description: 'Comma-seperated list of actions to include in the component.',
  //   },
  // },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  includeActions?: string;
}

const Template: Story<ArgTypes> = ({ includeActions }: ArgTypes) => html`
  <bldn-priv-request
    .included-actions="${includeActions || ''}"
  ></bldn-priv-request>
`;

export const Regular = Template.bind({});

// export const CustomIncludeActions = Template.bind({});
// CustomIncludeActions.args = {
//   includeActions: '[access]',
// };
