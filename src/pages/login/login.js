import './login.css';

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
            <input type="submit" class="btn btn--primary btn--submit" value="로그인">
            <span class="register__recommand">아직 회원이 아니신가요? <a href="javascript:void(0)">회원가입</a></span>
        </form>
      </div>
    </section>
  `;

  const menu = document.querySelector('.menu');
  const header = document.querySelector('.header');
  const wrap = document.querySelector('.wrap');

  menu.remove();
  header.remove();
  wrap.classList.add('.login-wrap');
  wrap.style.all = 'unset';

}