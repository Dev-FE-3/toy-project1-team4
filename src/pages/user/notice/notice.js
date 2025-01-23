import { header } from './../../../components/header/header.js';
import { nav } from './../../../components/nav/nav.js';
import './notice.css';
import axios from 'axios';
import { formatDateTime } from '../../../util/utils';

export const notice = async function (content) {
  content.innerHTML = `
    ${await nav()}
    <div class="wrap">
      ${await header()}
      <div class="container">
        <div id="notice">
          <ul class="row notice-card">
          
          </ul>
        </div>
        <section class="pagination">
            <a href="javascript:;" class="pagination--prev">prev</a> 
            <a href="javascript:;" class="pagination--index active">1</a>
            <a href="javascript:;" class="pagination--index">2</a>
            <a href="javascript:;" class="pagination--index">3</a>
            <a href="javascript:;" class="pagination--next">next</a>
          </section>
      </div>
    </div>
  `;

  async function getNoticeData() {
    let noticeCard = document.querySelector('.notice-card');

    // 비동기로 data 가져오기
    try {
      const response = await axios.get('api/notice');

      noticeCard.innerHTML = response.data
        .map(item => {
          return `
            <li class="notice-card col-4" data-notice-num="${item.noticeNum}">
              <a href="#" class="notice-card__link"> 
                <div class="card-image__container">
                  <div class="card-image__style" style="background-image: url(${
                    item.img_path
                  })"></div>  
                </div>
                <div class="card__details">
                  <h4 class="detail__title">${item.title}</h4>
                  <p class="detail__description">${item.content}</p>
                </div>
                <div class="card__author">
                  <img src="${item.authorImg}" class="author__img" />
                  <div class="author__details">
                    <div class="author__description">
                      <span class="author__position">${item.department}</span>
                      <span class="author__name">${item.name}</span>
                    </div>
                    <time>${formatDateTime(item.insert_date)}</time>
                  </div>
                </div>
              </a>
            </li>
          `;
        })
        .join('');
    } catch (error) {
      console.error(error);
    }
  }
  getNoticeData();
};
