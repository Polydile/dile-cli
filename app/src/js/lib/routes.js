import { html } from 'lit';

const setTitle = (title) => {
  document.title = title;
};

export const routes = [
  {
    path: '/', 
    render: () => html`<dile-page-home></dile-page-home>`,
    enter: () => setTitle('Home')
  },
  {
    path: '/about', 
    render: () => html`<dile-page-about></dile-page-about>`,
    enter: async () => {
      setTitle('About us');
      await import('../components/pages/dile-page-about.js');
    },
  },
  {
    path: '/login',
    render: () => html`<dile-user-login></dile-user-login>`,
    enter: async () => {
      setTitle('Login');
      await import('../components/user/dile-user-login.js');
    },
  },
  {
    path: '/register',
    render: () => html`<dile-user-register></dile-user-register>`,
    enter: async () => {
      setTitle('Register');
      await import('../components/user/dile-user-register.js');
    },
  },
];