import style from './home.module.css';

export const home = function (content) {

  content.innerHTML = `
    <div class="${style.title}">
      홈 화면 검정색
    </div>
  `;

}