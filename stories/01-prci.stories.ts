import { html, TemplateResult } from 'lit';
import '../packages/privacy-portal/dist/index.js';
import { allLocales } from '../packages/privacy-portal/dist/generated/locale-codes.js';
import { setLocale } from '../packages/privacy-portal/dist/localization.js';

export default {
  title: 'Privacy Request Capture Interface (PRCI)',
  id: 'prci',
  component: 'bldn-privacy-portal',
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
  <bldn-privacy-portal></bldn-privacy-portal>
`;

const CustomActionsTemplate: Story<ArgTypes> = ({ actions }: ArgTypes) => html`
  <bldn-privacy-portal
    actions="${actions || '["access","delete","transparency"]'}"
  ></bldn-privacy-portal>
`;

const CustomDataCategoriesTemplate: Story<ArgTypes> = ({
  dataCategories,
}) => html`
  <bldn-privacy-portal
    data-categories="${dataCategories || ''}"
  ></bldn-privacy-portal>
`;

const CustomLocaleTemplate: Story<ArgTypes> = ({ locale }: ArgTypes) => {
  setLocale(locale || 'fr');
  return html` <bldn-privacy-portal></bldn-privacy-portal> `;
};

const CustomPCETemplate: Story<ArgTypes> = ({
  computationBaseUrl,
}: ArgTypes) => html`
  <bldn-privacy-portal
    computation-base-url=${computationBaseUrl || ''}
  ></bldn-privacy-portal>
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
