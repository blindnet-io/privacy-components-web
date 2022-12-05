import { html, TemplateResult } from 'lit';
import '../packages/bridge/dist/index.js';

export default {
  title: 'Data Consumer Interface (DCI)',
  id: 'dci',
  component: 'bldn-bridge',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = () => html`
  <bldn-bridge></bldn-bridge>
`;

export const Regular = Template.bind({});
