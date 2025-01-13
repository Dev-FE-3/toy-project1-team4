import style from './notice.module.css';

export const notice = function (content) {

  content.innerHTML = `
    <div class="${style.title}">
      css연결하여 색깔 변경까지 구현
    </div>
  `;

}