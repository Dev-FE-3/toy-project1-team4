import './error.css';

export const error = function (content,err) {

  alert(err);
  
  content.innerHTML = `
    <div id="error">
      ERROR!
    </div>
  `;
}