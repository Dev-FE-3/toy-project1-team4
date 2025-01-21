import './home.css';
import axios from 'axios';
import { formatDateTime, approveStatusStyle } from './../../../util/utils.js';

export const home = function (content) {
  content.innerHTML = `
    <div id="home" class="row">
      <section class="box box--user col-3">
        <div class="box__bottom"></div>
      </section>
      <section class="box box--graph col-5">
        <div class="box__top">
          <h5 class="box__title">이번주 근무 시간</h5>
          <a href="javascript:;" class="box__more">더보기</a>
        </div>
        <div class="box__bottom">
          <span class="graph__time">25시간 39분</span>
          <ul class="graph__list">
            <li class="graph__item">
              <div class="graph__bar" style="height: 60%;"></div>
              <span class="graph__title">01/08</span>
            </li>
            <li class="graph__item">
              <div class="graph__bar" style="height: 80%;"></div>
              <span class="graph__title">01/09</span>
            </li>
            <li class="graph__item">
              <div class="graph__bar" style="height: 40%;"></div>
              <span class="graph__title">01/10</span>
            </li>
            <li class="graph__item">
              <div class="graph__bar" style="height: 20%;"></div>
              <span class="graph__title">01/11</span>
            </li>
            <li class="graph__item">
              <div class="graph__bar" style="height: 90%;"></div>
              <span class="graph__title">01/12</span>
            </li>
          </ul>
        </div>
      </section>
      <section class="box box--time col-4">
        <div class="box__top">
          <h5 class="box__title">남은 근무시간</h5>
          <a href="javascript:;" class="box__more">더보기</a>
        </div>
        <div class="box__bottom">
          <div class="time-view">
            <span class="time-view__countdown">04:28</span>
            <span class="time-view__now">현재 시각: <b class="time">00:00:00</b></span>
          </div>
          <div class="time-state">
            <div class="time-state__now">
              <span class="now__title">현재 상태</span>
              <label for="btn-toggle" class="now__switch">
                <input type="checkbox" id="btn-toggle" class="switch__input">
              </label>
              <span class="now__label">근무 종료</span>
            </div>
            <button type="button" class="btn btn--primary">근무 시작</button>

            <!-- modal -->
            <dialog class="modal" id="workStateModal">
              <div class="modal__header">
                <h5 class="modal__title">근무 시작</h5>
              </div>
              <div class="modal__body">
                <p class="modal__content">근무를 시작하시겠습니까?</p>
              </div>
              <div class="modal__footer">
                <button type="button" class="btn btn--secondary btn__close">취소</button>
                <button type="button" class="btn btn--primary btn__sbmit">저장</button>
              </div>
            </dialog>

          </div>
        </div>
      </section>
      <section class="box box--work col-5">
        <div class="box__top">
          <h5 class="box__title">근태 신청 현황</h5>
          <a href="javascript:;" class="box__more">더보기</a>
        </div>
        <div class="box__bottom">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">근태 날짜</th>
                <th scope="col">근태 유형</th>
                <th scope="col">결재 상태</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </section>
      <section class="box box--notice col-4">
        <div class="box__top">
          <h5 class="box__title">사내 공지</h5>
          <a href="javascript:;" class="box__more">더보기</a>
        </div>
        <div class="box__bottom">
          <ul class="notice-list"></ul>
        </div>
      </section>
      <section class="box box--meeting col-3">
        <div class="box__top">
          <h5 class="box__title">회의</h5>
          <a href="javascript:;" class="box__more">더보기</a>
        </div>
        <div class="box__bottom">
          <ul class="meeting-list"></ul>
        </div>
      </section>
    </div>
  `;

  async function getUser() {
    try {
      const boxBottom = document.querySelector('.box--user .box__bottom');
      const response = await axios.get('/api/user/2', { num : 2 });
      const userInfo = response.data.map((item) => {
        return `
          <img src="${item.IMG_LOCATION}" class="user-img" alt="profile">
          <div class="user-info">
            <span class="user-info__name">${item.NAME}</span>
            <span class="user-info__position">${item.POSITION}</span>
          </div>
        `
      }).join('');

      boxBottom.innerHTML = userInfo;
    } catch (error) {
      console.error(error);
    }
  }

  async function getWork() {
    try {
      const workTbody = document.querySelector('.box--work .table tbody');
      const response = await axios.post('api/absence', { num : 2 });
      const workTableTr = response.data.slice(0, 4).map((item) => {
        return `
          <tr>
            <td>${formatDateTime(item.START_DATE)}</td>
            <td>${item.TYPE}</td>
            <td><span class="label ${approveStatusStyle(item.STATUS)}">${item.STATUS}</span></td>
          </tr>
        `
      }).join('');

      workTbody.innerHTML = workTableTr;
    } catch (error) {
      console.error(error);
    }
  }

  async function getNotice() {
    try {
      const noticeList = document.querySelector('.box--notice .notice-list');
      const response = await axios.get('api/notice', { num : 2 });
      const noticeItem = response.data.slice(0, 7).map((item) => {
        return `
          <li><a href="javascript:;">${item.title}</a></li>
        `
      }).join('');

      noticeList.innerHTML = noticeItem;
    } catch (error) {
      console.error(error);
    }
  }

  async function getMeeting() {
    try {
      const meetingList = document.querySelector('.box--meeting .meeting-list');
      const response = await axios.post('api/meet', { num : 2 });
      const meetingItem = response.data.slice(0, 4).map((item) => {
        return `
          <li class="meeting-list__item">
            <a href="javascript:;" class="item__link">
              <p class="item__title">${item.TITLE}</p>
              <span class="item__time">${formatDateTime(item.TIME)}</span>
            </a>
          </li>
        `
      }).join('');

      meetingList.innerHTML = meetingItem;
    } catch (error) {
      console.error(error);
    }
  }

  getUser();
  getWork();
  getNotice();
  getMeeting();

  // graphFunc
  function graphFunc () {
    const graphList = document.querySelector('.box--graph .graph__list');
    const graphItems = graphList.querySelectorAll('.graph__item');
  
    graphItems.forEach((item) => {
      item.querySelector('.graph__bar').classList.add('active')
    });
  };

  window.onload = function() {
    graphFunc();
  };
  
  // timerFunc
  function timerFunc () {
    let date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const boxTime = document.querySelector('#home .box--time');
    const time = boxTime.querySelector('.time-view .time');

    time.innerHTML = `${hours}:${minutes}:${seconds}`;
  };

  timerFunc();
  setInterval(timerFunc, 1000);

  // userStateFunc
  const timeState = document.querySelector('.box--time .time-state');
  const switchInput = timeState.querySelector('.switch__input');
  const nowSwitch = timeState.querySelector('.now__switch');
  const nowLabel = timeState.querySelector('.now__label');
  let isChecked = switchInput.checked;

  function userStateFunc() {
    isChecked = !isChecked;
    isChecked ? nowLabel.innerHTML = '근무 시작' : nowLabel.innerHTML = '근무 종료';
    switchInput.classList.toggle('active');
    nowLabel.classList.toggle('active');
  }

  nowSwitch.addEventListener('click', userStateFunc);

  // modal
  const workStateModal = document.getElementById('workStateModal');
  const modalBtn = timeState.querySelector('.time-state .btn');
  const btnClose = timeState.querySelector('.modal__footer .btn__close');
  const btnSbmit = timeState.querySelector('.modal__footer .btn__sbmit');

  modalBtn.addEventListener('click', function () {
    workStateModal.showModal();
  });

  btnClose.addEventListener('click', function () {
    workStateModal.close();
  });

  btnSbmit.addEventListener('click', function () {
    workStateModal.close();
  });
}