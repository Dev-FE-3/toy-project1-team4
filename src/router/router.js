import { home } from '../pages/user/home/home.js'
import { login } from '../pages/common/login/login.js'
import { register } from '../pages/common/register/register.js'
import { work } from '../pages/user/work/work.js'
import { notice } from '../pages/user/notice/notice.js'
import { employeeList } from '../pages/admin/employee/list/employee-list.js'
import { employeeInfo } from '../pages/admin/employee/info/employee-info.js'
import { error } from '../pages/common/error/error.js'

const routes = {
  '/': home,
  '/login': login,
  '/register': register,
  '/work': work,
  '/notice': notice,
  '/admin/employee-list': employeeList,
  '/admin/employee-info': employeeInfo,

};



export const route = function () {
  
  const path = window.location.pathname;
  const content = document.querySelector('#content');

  try {
    const component = routes[path];
    component(content);
  } catch (err) {
    error(content,err);
  }

}