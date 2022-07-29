import { html, TemplateResult } from 'lit';
import '../src/bldn-priv-request.js';
import { allLocales } from '../src/generated/locale-codes.js';
import { setLocale } from '../src/utils/localization.js';

export default {
  title: 'BldnPrivRequest',
  component: 'bldn-priv-request',
  argTypes: {
    actions: {
      control: 'text',
      description:
        'JSON list of [actions](https://github.com/blindnet-io/product-management/blob/main/refs/schemas/priv/json-schema/priv-terms.schema.json) to include in the component.',
    },
    locale: {
      control: 'select',
      description: 'Language code for the component',
      options: allLocales,
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
  locale?: string;
}

const Template: Story<ArgTypes> = ({ actions }: ArgTypes) => html`
  <bldn-priv-request actions="${actions || ''}"></bldn-priv-request>
`;

const LocaleTemplate: Story<ArgTypes> = ({ locale }: ArgTypes) => {
  setLocale(locale || 'fr');
  return html` <bldn-priv-request></bldn-priv-request> `;
};

export const Regular = Template.bind({});

export const CustomActions = Template.bind({});
CustomActions.args = {
  actions: '["ACCESS","DELETE","TRANSPARENCY"]',
};

export const CustomLocale = LocaleTemplate.bind({});
CustomLocale.args = {
  locale: 'fr',
};
