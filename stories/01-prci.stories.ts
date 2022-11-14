import { html, TemplateResult } from 'lit';
import '../packages/prci/dist/index.js';
import { allLocales } from '../packages/prci/dist/generated/locale-codes.js';
import { setLocale } from '../packages/prci/dist/utils/localization.js';

export default {
  title: 'Privacy Request Capture Interface (PRCI)',
  id: 'prci',
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
  dataCategories?: string;
  locale?: string;
  computationBaseUrl?: string;
}

const RegularTemplate: Story<ArgTypes> = () => html`
  <bldn-priv-request></bldn-priv-request>
`;

const CustomActionsTemplate: Story<ArgTypes> = ({ actions }: ArgTypes) => html`
  <bldn-priv-request
    actions="${actions || '["access","delete","transparency"]'}"
  ></bldn-priv-request>
`;

const CustomDataCategoriesTemplate: Story<ArgTypes> = ({
  dataCategories,
}) => html`
  <bldn-priv-request
    data-categories="${dataCategories || ''}"
  ></bldn-priv-request>
`;

const CustomLocaleTemplate: Story<ArgTypes> = ({ locale }: ArgTypes) => {
  setLocale(locale || 'fr');
  return html` <bldn-priv-request></bldn-priv-request> `;
};

const CustomPCETemplate: Story<ArgTypes> = ({
  computationBaseUrl,
}: ArgTypes) => html`
  <bldn-priv-request
    computation-base-url=${computationBaseUrl || ''}
  ></bldn-priv-request>
`;

export const Regular = RegularTemplate.bind({});

export const CustomActions = CustomActionsTemplate.bind({});
CustomActions.args = {
  actions: '["access","delete","transparency"]',
};

export const CustomDataCategories = CustomDataCategoriesTemplate.bind({});
CustomDataCategories.args = {
  dataCategories: '["contact", "name", "uid", "other-data"]',
};

export const CustomLocale = CustomLocaleTemplate.bind({});
CustomLocale.args = {
  locale: 'fr',
};

export const CustomPCE = CustomPCETemplate.bind({});
CustomPCE.args = {
  computationBaseUrl: 'http://localhost:9000/v0/',
};
