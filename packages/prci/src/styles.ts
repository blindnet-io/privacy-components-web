import { css } from 'lit';

export const containerStyles = css`
  .dark-border {
    border: 1px solid #000;
    border-radius: 10px;
  }

  .medium-border {
    border: 1px solid #5b5b5b;
    border-radius: 10px;
  }

  .light-border {
    border: 1px solid #c4c4c4;
    border-radius: 10px;
  }

  .no-line-border {
    border-radius: 10px;
  }

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

  .date-restriction-ctr {
    display: grid;
    row-gap: 35px;
  }

  .date-restriction-ctr div {
    padding: 0px 0px 0px 30px;
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

  .nav-btn {
    height: 50px;
    background-color: #18a0fb;
    border-width: 0px;
    border-radius: 6px;
    font-size: 18px;
    color: #ffffff;
    /* width: 375px; */
    margin: 0px 0px -200px 0px;
    padding: 0px 25px;
  }

  .left-btn {
    justify-self: flex-start;
  }

  .ctr-btn {
    justify-self: center;
    justify-content: center;
  }

  .right-btn {
    justify-self: flex-end;
  }

  .curve-btn {
    border-radius: 8px;
  }

  .animated-btn {
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1),
      0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.2),
      0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  .animated-btn:not([disabled]):hover {
    transform: translateY(-2px);
    transition: 0.2s;
    box-shadow: 0px 7px 10px 0px rgba(0, 0, 0, 0.3),
      0px 4px 4px rgba(0, 0, 0, 0.2), 0px 6px 8px rgba(0, 0, 0, 0.2),
      0px 10px 16px rgba(0, 0, 0, 0.2);
  }

  .animated-btn:not([disabled]):active {
    transform: translateY(2px);
    transition: 0.2s;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1),
      0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.2),
      0px 8px 16px rgba(0, 0, 0, 0.2);
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

  p {
    padding: 0px;
    margin: 0px;
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
