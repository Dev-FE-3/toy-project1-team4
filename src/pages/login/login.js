import './login.css';

export const login = function (content) {

  content.innerHTML = `
    <section id="login">
      <div class="logo">
        <img src="./../public/images/img_logo.png" class="logo__img" alt="PPangGeut">
      </div>
      <div class="login--form">
        <form action="javascipt:void(0)" method="post">
            <p class="login--form__title">로그인</p>
            <div class="input-wrap">
                <label for="input-01" class="input-label">아이디</label>
                <input type="text" class="input-text" id="input-01" placeholder="사원번호 또는 이메일 주소를 입력해주세요">
            </div>    
            <div class="input-wrap">
              <label for="input-01" class="input-label">패스워드</label>
              <input type="password" class="input-text" id="input-01" placeholder="">
              <a href="javascript:void(0)">아이디/패스워드 찾기</a>
            </div>
            <input type="submit" class="btn btn--primary" value="로그인">
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