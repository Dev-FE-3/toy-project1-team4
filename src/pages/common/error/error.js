import style from './error.module.css';

export const error = function (content,err) {

  alert(err);
  
  content.innerHTML = `
    <div class="${style.title}">
      ERROR!
    </div>
  `;

}