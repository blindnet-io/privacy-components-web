import { css } from 'lit';

export const bldnStyles = css`
  :host {
    /* 
      This goofiness allows us to do things like rgba(var(--color-primary-rgb), 0.1)
      while still having color variables exposed.
    */

    --color-primary: rgb(var(--bldn-color-primary, 65, 105, 225));
    --color-primary-rgb: var(--bldn-color-primary, 65, 105, 225);

    --color-positive: rgb(var(--bldn-color-positive, 9, 185, 70));
    --color-positive-rgb: var(--bldn-color-positive, 9, 185, 70);

    --color-negative: rgb(var(--bldn-color-negative, 209, 53, 13));
    --color-negative-rgb: var(--bldn-color-negative, 209, 53, 13);

    --color-warning: rgb(var(--bldn-color-warning, 244, 144, 30));
    --color-warning-rgb: var(--bldn-color-warning, 244, 144, 30);

    --color-lightest: rgb(var(--bldn-color-lightest, 224, 224, 224));
    --color-lightest-rgb: var(--bldn-color-lightest, 224, 224, 224);

    --color-light: rgb(var(--bldn-color-light, 200, 200, 200));
    --color-light-rgb: var(--bldn-color-light, 200, 200, 200);

    --color-medium: rgb(var(--bldn-color-medium, 151, 151, 151));
    --color-medium-rgb: var(--bldn-color-medium, 151, 151, 151);

    --color-dark: rgb(var(--bldn-color-dark, 91, 91, 91));
    --color-dark-rgb: var(--bldn-color-dark, 91, 91, 91);

    --color-darkest: rgb(var(--bldn-color-darkest, 31, 31, 31));
    --color-darkest-rgb: var(--bldn-color-darkest, 31, 31, 31);

    --background: rgb(var(--bldn-background, 255, 255, 255));

    --font-size-small: var(--bldn-font-size-small, 1rem);

    --font-size-medium: var(--bldn-font-size-medium, 1.25rem);

    --font-size-large: var(--bldn-font-size-large, 1.5rem);

    --font-family: var(
      --bldn-font-family,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif
    );
  }

  * {
    font-family: var(
      --bldn-font-family,
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      'Open Sans',
      'Helvetica Neue',
      sans-serif
    );
  }
`;
