import { css } from '@emotion/react';
import { fonts } from './fonts';

const globalStyles = css`
  ${fonts}

  * {
    margin: 0px;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  form,
  textarea,
  label,
  table {
    font-family:
      'Apple SD Gothic Neo',
      -apple-system;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  #root {
    min-height: 100vh;
  }
  body {
    line-height: 1;
    background: #ffffff;
  }
  ol,
  ul {
    list-style: none;
  }
  button {
    font-family:
      'Apple SD Gothic Neo',
      -apple-system;
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
  input {
    font-family:
      'Apple SD Gothic Neo',
      -apple-system;
  }

  html {
    font-size: 62.5%;
  }

  html.old-mode {
    font-size: 75%;
  }

  @media (max-width: 450px) {
    html {
      font-size: 56.25%; /* 9px */
    }
    html.old-mode {
      font-size: 68.75%; /* 11px (9px + 2px) */
    }
  }

  @media (max-width: 350px) {
    html {
      font-size: 50%; /* 8px */
    }
    html.old-mode {
      font-size: 62.5%; /* 10px (8px + 2px) */
    }
  }
`;

export default globalStyles;
