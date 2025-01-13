import style from './work.module.css';

export const work = function (content) {

  content.innerHTML = `
    <div class="${style.title}">
      여기는 근태페이지입니다
    </div>
  `;

}