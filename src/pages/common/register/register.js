import style from './register.module.css';

export const register = function (content) {

  content.innerHTML = `
    <div class="${style.title}">
      css연결하여 색깔 변경까지 구현
    </div>
  `;

}