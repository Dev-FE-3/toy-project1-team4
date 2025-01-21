import './notice.css';
import noticeData from '../../../../server/data/notice.json';

const triggerRender = function (content) {
  notice(content);
};

 // 데이터를 카드로 만듬
const noticeItems = noticeData.data;
const cardsHTML = noticeItems.map((item) => {
  return `
      <li class="notice-card col-4" data-notion-num="${item.cardNum}">
        <a href="#" class="notice-card__link">
          <div class="card-image__container">
            <img src="${item.cardImg}" alt="게시글 이미지" class="card-image" />
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
  // .join(''); 
  
  const listLength = 6; // 한 페이지에 들어갈 card 수
  const indexLength = 8; // pagination bar 에 표시할 최대 인덱스 버튼 개수 indexSize
  const initialIndex = 1; // 처음 접속 시 인덱스 값 initIndex
  const totalIndex = Math.ceil(noticeItems.length / listLength); // 총 인덱스 개수
  let paginationBarIndex = 1; // 현재 페이지네이션 바 인덱스 currentIndexSet
  let currentIndex = initialIndex; // 현재 페이지

  export const notice = function (content) {

    const paginationBtnsRender = function () { //prev, next 같이 그리면 안되나? pageBtnRender
      const paginationBtnList = []; //pageBustItems
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
          // console.log(btn.dataset.btnIndex);
          currentIndex = btn.dataset.btnIndex;
          triggerRender(content); // 상태값이 변경되었으므로 페이지 렌더 함수를 재호출
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
        <div class="notice__bottom">
          <section class="pagination">
            <a href="#" class="pagination--prev"> prev </a>
            ${paginationBtns}
            <a href="#" class="pagination--next"> next </a>
          </section>
        </div>
      </div>
    `;
    paginationBtnsAddEvent();
  };