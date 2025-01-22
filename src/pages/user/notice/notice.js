import './notice.css';
import noticeData from '../../../../server/data/notice.json';

const triggerRender = function (content) {
  notice(content);
};

 // 데이터를 카드로 만듬
const noticeItems = noticeData.data;
  console.log("노션아이템들 확인 ::::   "+noticeItems)
const cardsHTML = noticeItems.map((item) => {
  return `
      <li class="notice-card col-4" data-notion-num="${item.cardNum}">
        <a href="#" class="notice-card__link"> 
          <div class="card-image__container">
            <div class="card-image__style" style="background-image: url(${item.cardImg})"></div>  
          </div>
          <div class="card__details">
            <h4 class="detail__title">${item.cardTitle}</h4>
            <p class="detail__description">${item.cardDescription}</p>
          </div>
          <div class="card__author">
            <img src="${item.authorImg}" class="author__img" />
            <div class="author__details">
              <div class="author__description">
                <span class="author__position">${item.authorPosition}</span>
                <span class="author__name">${item.authorName}</span>
              </div>
              <time>${item.date}</time>
            </div>
          </div>
        </a>
      </li>
    `;
  })
  
  const listLength = 6; 
  const indexLength = 8; 
  const initialIndex = 1; 
  const totalIndex = Math.ceil(noticeItems.length / listLength); 
  let paginationBarIndex = 1; 
  let currentIndex = initialIndex; 

  export const notice = function (content) {

    const paginationBtnsRender = function () { 
      const paginationBtnList = [];  
      for (
        let i = 1 + indexLength * (paginationBarIndex - 1); 
        i <= indexLength * paginationBarIndex && i <= totalIndex; 
        i++
      ) {
        paginationBtnList[i] = `<a href="javascript:;" 
        data-btn-index="${i}" 
        class="pagination--index ${i == currentIndex ? 'active' : ''}">${i}</a>`;
      }
      return paginationBtnList.join('');
    };

    const paginationBtnsAddEvent = function () {
      const indexBtn = document.querySelectorAll('.pagination--index');
      indexBtn.forEach(function (btn) {
        btn.addEventListener('click', function () {
          currentIndex = btn.dataset.btnIndex;
          triggerRender(content); 
        });
      });
  
      const moveBtn = {
        prev: document.querySelector('.pagination--prev'),
        next: document.querySelector('.pagination--next'),
      };
  
      moveBtn.prev.addEventListener('click', function () {
        console.log('prev clicked');
        if (currentIndex > indexLength) {
          currentIndex -= indexLength;
          paginationBarIndex--;
        } else {
          currentIndex = 1;
        }
  
        triggerRender(content);
      });
      moveBtn.next.addEventListener('click', function () {
        if (totalIndex > indexLength) {
          if (currentIndex > Math.floor(totalIndex / indexLength) * indexLength) {
            currentIndex = totalIndex;
          } else {
            currentIndex = indexLength * paginationBarIndex + 1;
            paginationBarIndex++;
          }
        } else {
          currentIndex = totalIndex;
        }
        triggerRender(content);
      });
  
      return;
    };

    const paginationBtns = paginationBtnsRender();

    content.innerHTML = `
      <div id="notice">
        <ul class="row">
          ${cardsHTML.slice(
            (currentIndex - 1) * listLength,
            (currentIndex - 1) * listLength + listLength,
          )
          .join('')}
        </ul>
        <div class="pagination">
          <a href="#" class="pagination--prev"> prev </a>
            ${paginationBtns}
          <a href="#" class="pagination--next"> next </a>
        </div>
      </div>
    `;
    paginationBtnsAddEvent();
  };