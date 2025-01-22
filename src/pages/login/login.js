import './login.css';
import { route } from '../../router/router.js';
import axios from 'axios';

export const login = function (content) {
  content.innerHTML = `
    <section id="login">
      <div class="logo">
        <a href="/" class="logo__link">
          <img src="./../public/images/img_logo.png" class="logo__img" alt="PPangGeut">
        </a>
      </div>
      <div class="login--form">
        <form action="javascipt:void(0)" method="post">
            <p class="login--form__title">로그인</p>
            <div class="input-wrap form__id">
                <label for="login__id" class="input-label">아이디</label>
                <input type="text" class="input-text" id="login__id" placeholder="사원번호 또는 이메일 주소를 입력해주세요">
            </div>    
            <div class="input-wrap form__pw">
              <label for="login__pw" class="input-label">패스워드</label>
              <input type="password" class="input-text" id="login__pw" placeholder="">
              <div class="login--form__find">
                <a href="javascript:void(0)">아이디/패스워드 <span class="search">찾기</span></a>
              </div>
            </div>
            <a href="javascript:void(0)" class="login--submit"><input type="submit" class="btn btn--primary btn--submit" value="로그인"></a>
            <span class="register__recommand">아직 회원이 아니신가요? <a href="javascript:void(0)">회원가입</a></span>
        </form>
      </div>
    </section>
  `;

  const loginSubmit = document.querySelector('.login--submit');
  loginSubmit.addEventListener('click', async function () {
    let path = '/login';

    (await checkLogin())
      ? (path = '/')
      : alert('사용자 정보를 다시 확인해 주세요');

    history.pushState(null, null, path);
    route();
  });

  async function checkLogin() {
    const userId = document.querySelector('#login__id').value;
    const userPw = document.querySelector('#login__pw').value;

    const request = {
      id: userId,
      pw: userPw,
    };

    const response = await axios.post('/api/login', request);

    if (response.data.length > 0) {
      sessionStorage.setItem('num', response.data[0].NUM);
      sessionStorage.setItem('name', response.data[0].NAME);
      sessionStorage.setItem('role', response.data[0].ROLE);
      return true;
    }

    return false;
  }
};
