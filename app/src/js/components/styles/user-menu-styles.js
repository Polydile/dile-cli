import {css} from 'lit';

export const userMenuStyles = css`
  .loginoverlay {
    --dile-menu-overlay-width: 200px;  
  }
  .loginoption {
    display: block;
    padding: 20px 5px 20px 20px;
    text-decoration: none;
    text-transform: uppercase;
    color: var(--dile-on-primary-light-color);
    font-weight: bold;
    transition: all 0.3s ease;
    background-color: var(--dile-primary-light-color);
    border-radius: 2px;
    flex-grow: 1;
  }
  .loginoption:visited {
    color: #303030;
  }
  .loginoption:first-child {
    border-bottom: 1px solid #e6e6e6;
  }
  .loginoption:hover {
    background-color: var(--dile-primary-dark-color);
    color: var(--dile-on-primary-dark-color);
  }
`;