import './login.css';
import { route } from '../../router/router.js';
import { fetchData } from '../../util/utils.js';

export const login = function (content) {
  content.innerHTML = `
    <section id="login">
      <div class="logo">
        <a href="/" class="logo__link">
          <img src="./../public/images/img_logo.png" class="logo__img" alt="PPangGeut">
        </a>
      </div>
      <div class="login">
        <form method="post" class="login--form">
            <p class="login--form__title">로그인</p>
            <div class="input-wrap form__id">
                <label for="login__id" class="input-label">아이디</label>
                <input type="text" class="input-text" id="login__id" placeholder="사원번호 또는 이메일 주소를 입력해주세요">
            </div>    
            <div class="input-wrap form__pw">
              <label for="login__pw" class="input-label">패스워드</label>
              <input type="password" class="input-text" id="login__pw" placeholder="비밀번호를 입력해주세요" autocomplete="off">
              <div class="login--form__find">
                <a href="#">아이디/패스워드 <span class="search">찾기</span></a>
              </div>
            </div>
            <input type="submit" class="btn btn--primary login--submit" value="로그인">
            <span class="register__recommand">아직 회원이 아니신가요? <a href="#">회원가입</a></span>
        </form>
      </div>
    </section>
  `;

  initializePage();
};

function initializePage() {
  loginFormEvent();
  userLogin();
}

function loginFormEvent() {
  const loginSubmit = document.querySelector('.login--submit');
  loginSubmit.addEventListener('click', async function () {
    let path = '/login';

    (await userLogin()) ? (path = '/') : alert('사용자 정보를 다시 확인해 주세요');

    history.pushState(null, null, path);
    route();
  });
}

async function userLogin() {
  const userId = document.querySelector('#login__id').value;
  const userPw = document.querySelector('#login__pw').value;

  const request = {
    id: userId,
    pw: userPw,
  };

  const response = await fetchData('/api/login', request, 'post');

  if (response.length > 0) {
    sessionStorage.setItem('num', response[0].NUM);
    sessionStorage.setItem('name', response[0].NAME);
    sessionStorage.setItem('role', response[0].ROLE);
    return true;
  }

  return false;
}
