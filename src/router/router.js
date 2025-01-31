import { home } from '../pages/user/home/home.js';
import { login } from '../pages/login/login.js';
import { register } from '../pages/register/register.js';
import { guide } from '../pages/guide/guide.js';
import { work } from '../pages/user/work/work.js';
import { notice } from '../pages/user/notice/notice.js';
import { employeeList } from '../pages/admin/employee/list/employee-list.js';
import { employeeInfo } from '../pages/admin/employee/info/employee-info.js';
import { error } from '../pages/error/error.js';

const routes = {
  '/': home,
  '/login': login,
  '/register': register,
  '/guide': guide,
  '/work': work,
  '/notice': notice,
  '/admin/employee-list': employeeList,
  '/admin/employee-info': employeeInfo,
};

export const route = function () {
  try {
    checkAuth();
    // const component = routes[path];
    // component(content);
  } catch (err) {
    error(content, err);
  }
};

//세션 로그인 상태 확인 후 route
const checkAuth = function () {
  let path = window.location.pathname;
  const content = document.querySelector('#content');

  if (path === '/logout') {
    window.sessionStorage.clear();
  }

  if (sessionStorage.getItem('num') === null) {
    path = '/login';
    history.pushState(null, null, '/login');
    login(content);
  } else {
    const component = routes[path];
    component(content);
  }
};
