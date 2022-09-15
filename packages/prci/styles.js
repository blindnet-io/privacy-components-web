import { css } from 'lit';

const PRCIStyles = css `
  .border--light {
    border: 1px solid;
    border-color: var(--prci-border-light-color, #c4c4c4);
  }

  .border--medium {
    border: 1px solid;
    border-color: var(--prci-border-medium-color, #5b5b5b);
  }

  .border--dark {
    border: 1px solid;
    border-color: var(--prci-border-dark-color, #000000);
  }

  .border--rounded {
    border-radius: 10px;
  }

  .border--thin {
    border-width: var(--prci-border-thin, 1px);
  }

  .border--thick {
    border-width: var(--prci-border-thick, 2px);
  }

  /* Button Styles */

  button {
    font-family: var(
      --prci-font-family,
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
    font-size: 16px;
  }

  .svg-btn {
    border: none;
    padding: 0px;
    margin: 0px;
    background: none;
  }

  .link-btn {
    display: grid;
    grid-auto-flow: column;
    font-size: 16px;
    column-gap: 7.5px;
    background: none;
    border: none;
    width: fit-content;
    align-items: center;
    padding: 0px;
  }

  .nav-btn {
    height: 50px;
    background-color: #18a0fb;
    border-width: 0px;
    border-radius: 6px;
    font-size: 18px;
    color: #ffffff;
    margin: 0px 0px -200px 0px;
    padding: 0px 25px;
  }

  .btn--centered {
    justify-self: center;
    justify-content: center;
  }

  .btn--curved {
    border-radius: 8px;
  }

  .btn--clickable {
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1),
      0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.2),
      0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  .btn--clickable:not([disabled]):hover {
    transform: translateY(-2px);
    transition: 0.2s;
    box-shadow: 0px 7px 10px 0px rgba(0, 0, 0, 0.3),
      0px 4px 4px rgba(0, 0, 0, 0.2), 0px 6px 8px rgba(0, 0, 0, 0.2),
      0px 10px 16px rgba(0, 0, 0, 0.2);
  }

  .btn--clickable:not([disabled]):active {
    transform: translateY(2px);
    transition: 0.2s;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1),
      0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.2),
      0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  /* Text Styles */

  p {
    font-family: var(
      --prci-font-family,
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
    font-size: 16px;
    padding: 0px;
    margin: 0px;
  }

  span {
    font-family: var(
      --prci-font-family,
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
    font-size: 16px;
  }

  textarea {
    font-family: var(
      --prci-font-family,
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
    font-size: 16px;
    background: #f8f8fc;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
  }

  .text--underline {
    text-decoration: underline;
  }

  .text--italic {
    font-style: italic;
  }

  .text--center-vertical {
    align-items: center;
    justify-content: center;
  }

  /* Container Styles */

  .view-ctr {
    padding: 60px;
    width: 1050px;
  }

  .provenance-restriction {
    border: none;
    padding: 0px;
    margin: 0px;
  }

  .provenance-restriction input {
    margin: 20px 0px 20px 30px;
  }

  .provenance-restriction input:nth-last-child(3) {
    margin: 20px 0px 0px 30px;
  }

  .provenance-restriction input:first-child {
    margin: 35px 0px 20px 30px;
  }

  .date-restriction {
    display: grid;
    row-gap: 35px;
  }

  .date-restriction div {
    padding: 0px 0px 0px 30px;
  }
`;

export { PRCIStyles };
//# sourceMappingURL=styles.js.map
