import './notice.css';

export const notice = function (content) {

  content.innerHTML = `
    <div id="notice">
      사내 공지
    </div>
  `;
}