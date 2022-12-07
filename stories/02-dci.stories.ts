import { html, TemplateResult } from 'lit';
import '../packages/bridge/dist/index.js';

export default {
  title: 'Blindnet Bridge',
  id: 'bridge',
  component: 'bldn-bridge',
  argTypes: {},
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {}

const Template: Story<ArgTypes> = () => html` <bldn-bridge></bldn-bridge> `;

export const Regular = Template.bind({});
