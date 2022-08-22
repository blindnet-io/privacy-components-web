import { css } from 'lit';

export const containerStyles = css`
  .dark-border {
    border: 2px solid #000;
    border-radius: 10px;
  }

  .medium-border {
    border: 2px solid #5b5b5b;
    border-radius: 10px;
  }

  .light-border {
    border: 2px solid #c4c4c4;
    border-radius: 10px;
  }

  .no-line-border {
    border-radius: 10px;
  }
`;

export const buttonStyles = css`
  button {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .svg-btn {
    border: none;
    padding: 0px;
    margin: 0px;
    background: none;
  }

  .link-btn {
    display: grid;
    /* grid-template-columns: repeat(2, 1fr); */
    grid-auto-flow: column;
    font-size: 16px;
    column-gap: 7.5px;
    background: none;
    border: none;
    width: fit-content;
    align-items: center;
    padding: 0px;
  }

  .open-btn {
    height: 24px;
    background: url('packages/prci/src/assets/icons/open_container_arrow.svg')
      no-repeat;
    width: 24px;
    border: none;
  }

  .close-btn {
    height: 24px;
    background: url('packages/prci/src/assets/icons/close_container_arrow.svg')
      no-repeat;
    width: 24px;
    border: none;
  }

  .nav-btn {
    height: 50px;
    background-color: #18a0fb;
    border-width: 0px;
    border-radius: 6px;
    font-size: 18px;
    color: #ffffff;
    width: 375px;
    margin: 0px 0px -200px 0px;
    padding: 0px 25px;
  }

  .curve-btn {
    border-radius: 6px;
  }

  .left-btn {
    justify-self: flex-start;
  }

  .ctr-btn {
    justify-self: center;
  }

  .right-btn {
    justify-self: flex-end;
  }
`;

export const textStyles = css`
  .underline {
    text-decoration: underline;
  }

  .italic {
    font-style: italic;
  }

  .ctr-txt-vert {
    align-items: center;
    justify-content: center;
  }

  .medium-font {
    color: #5b5b5b;
  }

  .std-txt-area {
    background: #f8f8fc;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
  }

  .std-txt-input {
    background: #f8f8fc;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
  }
`;

export const imgStyles = css`
  .ctr-img {
    justify-content: center;
    align-items: center;
  }

  .medium-img {
    filter: invert(34%) sepia(0%) saturate(245%) hue-rotate(145deg)
      brightness(97%) contrast(83%);
  }
`;
