import './notice.css';
import noticeData from '../../../../server/data/notice.json';

export const notice = function (content) {
  const noticeItems = noticeData.data;
  
  const cardsHTML = noticeItems.map((item) => {
    const { cardId, cardImg, cardTitle, cardDescription, authorImg, authorPosition, authorName, date } = item;
  
    return `
        <li class="notice-card col-4" id="${cardId}">
          <a href="#" class="notice-card__link">
            <div class="card-image__container">
              <img src="${cardImg}" alt="게시글 이미지" class="card-image" />
            </div>
            <div class="card__details">
              <h4 class="detail__title">${cardTitle}</h4>
              <p class="detail__description">${cardDescription}</p>
            </div>
            <div class="card__author">
              <img src="${authorImg}" class="author__img" />
              <div class="author__details">
                <div class="author__description">
                  <span class="author__position">${authorPosition}</span>
                  <span class="author__name">${authorName}</span>
                </div>
                <time>${date}</time>
              </div>
            </div>
          </a>
        </li>
      `;
    })
    .join(''); 

  content.innerHTML = `
    <div id="notice">
      <ul class="row">
        ${cardsHTML}
      </ul>
      <div class="notice__bottom">
        <section class="pagination">
          <a href="#" class="pagination--prev">
            prev
          </a>
          <a href="#" class="active">
            1
          </a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">6</a>
          <a href="#">7</a>
          <a href="#">8</a>
          <a href="#" class="pagination--next">
            next
          </a>
        </section>
      </div>
    </div>
  `;
};


{/* 페이지네이션
    <section class="pagination">
      <a href="#" class="pagination--prev">
        prev
      </a>
      <a href="#" class="active">
        1
      </a>
      <a href="#">2</a>
      <a href="#">3</a>
      <a href="#">4</a>
      <a href="#">5</a>
      <a href="#">6</a>
      <a href="#">7</a>
      <a href="#">8</a>
      <a href="#" class="pagination--next">
        next
      </a>
    </section>
    */}