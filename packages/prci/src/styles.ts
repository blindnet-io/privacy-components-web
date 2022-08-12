import { css } from 'lit';

export const buttonStyles = css`
  .link-btn {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 7.5px;
    background: none;
    border: none;
    width: fit-content;
    align-items: center;
  }

  .open-btn {
    height: 24px;
    background: url('/src/assets/icons/open_container_arrow.svg');
    width: 24px;
    border: none;
  }

  .close-btn {
    height: 24px;
    background: url('/src/assets/icons/close_container_arrow.svg');
    width: 24px;
    border: none;
  }

  .ctr-btn {
    justify-self: center;
  }
`;

export const textStyles = css`
  .underline {
    text-decoration: underline;
  }
`;

export const imgStyles = css`
  .ctr-img {
    justify-content: center;
    align-items: center;
  }
`;
