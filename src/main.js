import { route } from './router/router.js'

const app = async function () {
  await checkAuth()
  init()
  route()
}

//로그인 상태 확인
const checkAuth = function () {
  //로직 추가 필요
};

const init = function () {
  window.addEventListener('popstate', route)
}

document.addEventListener('DOMContentLoaded', app);
