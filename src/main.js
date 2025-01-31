import { route } from './router/router.js';

const app = async function () {
  init();
  route();
};

const init = function () {
  window.addEventListener('popstate', route);
  document.body.addEventListener('click', navigatePage);
};

const navigatePage = event => {
  event.preventDefault();

  const path = event.target.getAttribute('href');
  const anchor = event.target.closest('a');

  if (anchor && anchor.href) {
    history.pushState(null, null, anchor.href);
    route();
  }
};

document.addEventListener('DOMContentLoaded', app);
