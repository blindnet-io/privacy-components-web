import { addons } from '@web/storybook-prebuilt/addons.js';
import { create } from '@web/storybook-prebuilt/theming.js';

const blindnetTheme = create({
  base: 'light',
  brandTitle: 'blindnet - Privacy Components for the Web',
  brandUrl: 'https://blindnet.dev',
  brandImage:
    'https://user-images.githubusercontent.com/7578400/163277439-edd00509-1d1b-4565-a0d3-49057ebeb92a.png#gh-light-mode-only',
});

addons.setConfig({
  theme: blindnetTheme,
});
