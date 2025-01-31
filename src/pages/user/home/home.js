import { header } from './../../../components/header/header.js';
import { nav } from './../../../components/nav/nav.js';
import './home.css';
import axios from 'axios';
import {
  formatDateTime,
  approveStatusStyle,
  timerFunc,
} from './../../../util/utils.js';

export const home = async function (content) {
  content.innerHTML = `
    ${await nav()}
    <div class="wrap">
      ${await header()}
      <div class="container">
        <div id="home" class="row">
          ${renderUserBox()}
          ${renderGraphBox()}
          ${renderTimeBox()}
          ${renderWorkBox()}
          ${renderNoticeBox()}
          ${renderMeetingBox()}
        </div>
      </div>
    </div>
  `;

  initializePage();
};

function renderUserBox() {
  return `
    <section class="box box--user col-3 col-lg-4 col-md-6">
      <div class="box__bottom"></div>
    </section>
  `;
}

function renderGraphBox() {
  return `
    <section class="box box--graph col-5 col-lg-8 col-md-6">
      <div class="box__top">
        <h5 class="box__title">이번주 근무 시간</h5>
        <a href="javascript:;" class="box__more">더보기</a>
      </div>
      <div class="box__bottom">
        <span class="graph__time">25시간 39분</span>
        <ul class="graph__list">
          ${renderGraphItems()}
        </ul>
      </div>
    </section>
  `;
}

function renderGraphItems() {
  const graphData = [
    { date: '01/08', height: '60%' },
    { date: '01/09', height: '80%' },
    { date: '01/10', height: '40%' },
    { date: '01/11', height: '20%' },
    { date: '01/12', height: '90%' },
  ];

  return graphData
    .map(
      ({ date, height }) => `
      <li class="graph__item">
        <div class="graph__bar" style="height: ${height};"></div>
        <span class="graph__title">${date}</span>
      </li>
    `
    )
    .join('');
}

function renderTimeBox() {
  return `
    <section class="box box--time col-4 col-lg-5 col-md-5">
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
          ${renderModal()}
        </div>
      </div>
    </section>
  `;
}

function renderModal() {
  return `
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
  `;
}

function renderWorkBox() {
  return `
    <section class="box box--work col-5 col-lg-7 col-md-7">
      <div class="box__top">
        <h5 class="box__title">근태 신청 현황</h5>
        <a href="javascript:;" class="box__more">더보기</a>
      </div>
      <div class="box__bottom">
        <table class="table table--center">
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
  `;
}

function renderNoticeBox() {
  return `
    <section class="box box--notice col-4 col-lg-6 col-md-6">
      <div class="box__top">
        <h5 class="box__title">사내 공지</h5>
        <a href="javascript:;" class="box__more">더보기</a>
      </div>
      <div class="box__bottom">
        <ul class="notice-list"></ul>
      </div>
    </section>
  `;
}

function renderMeetingBox() {
  return `
    <section class="box box--meeting col-3 col-lg-6 col-md-6">
      <div class="box__top">
        <h5 class="box__title">회의</h5>
        <a href="javascript:;" class="box__more">더보기</a>
      </div>
      <div class="box__bottom">
        <ul class="meeting-list"></ul>
      </div>
    </section>
  `;
}

async function fetchData(method, url, data = {}) {
  try {
    const response = await axios({method, url, data});
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function initializePage() {
  const currentStorage = window.sessionStorage;
  const [userData, absenceData, noticeData, meetData] = await Promise.all([
    fetchData('get', `/api/user/${currentStorage.num}`),
    fetchData('post', '/api/absence', { num: currentStorage.num }),
    fetchData('get', '/api/notice', { num: currentStorage.num }),
    fetchData('post', '/api/meet', { num: currentStorage.num })
  ]);

  getUser(userData);
  getWork(absenceData);
  getNotice(noticeData);
  getMeeting(meetData);

  const time = document.querySelector('#home .box--time .time-view .time');
  timerFunc(time);

  graphFunc();
  userStateFunc();
  modalFunc();
}

function getUser(userData) {
  const boxBottom = document.querySelector('.box--user .box__bottom');
  const userInfo = userData
    .map(
      item => `
      <img src="${item.IMG_LOCATION}" class="user-img" alt="profile">
      <div class="user-info">
        <span class="user-info__name">${item.NAME}</span>
        <span class="user-info__position">${item.DEPARTMENT} / ${item.POSITION}</span>
      </div>
    `
    )
    .join('');

  boxBottom.innerHTML = userInfo;
}

function getWork(absenceData) {
  const workTbody = document.querySelector('.box--work .table tbody');
  const workTableTr = absenceData
    .slice(0, 4)
    .map(
      item => `
      <tr>
        <td>${formatDateTime(item.START_DATE)}</td>
        <td>${item.TYPE}</td>
        <td><span class="label ${approveStatusStyle(item.STATUS)}">${item.STATUS}</span></td>
      </tr>
    `
    )
    .join('');

  workTbody.innerHTML = workTableTr;
}

function getNotice(noticeData) {
  const noticeList = document.querySelector('.box--notice .notice-list');
  const noticeItem = noticeData
    .slice(0, 7)
    .map(item => `<li><a href="javascript:;">${item.title}</a></li>`)
    .join('');

  noticeList.innerHTML = noticeItem;
}

function getMeeting(meetData) {
  const meetingList = document.querySelector('.box--meeting .meeting-list');
  const meetingItem = meetData
    .slice(0, 4)
    .map(
      item => `
      <li class="meeting-list__item">
        <a href="javascript:;" class="item__link">
          <p class="item__title">${item.TITLE}</p>
          <span class="item__time">${formatDateTime(item.TIME, 'time')}</span>
        </a>
      </li>
    `
    )
    .join('');

  meetingList.innerHTML = meetingItem;
}

function graphFunc() {
  const graphItems = document.querySelectorAll('.box--graph .graph__item .graph__bar');
  graphItems.forEach(item => item.classList.add('active'));
}

function userStateFunc() {
  const timeState = document.querySelector('.box--time .time-state');
  const switchInput = timeState.querySelector('.switch__input');
  const nowSwitch = timeState.querySelector('.now__switch');
  const nowLabel = timeState.querySelector('.now__label');
  let isChecked = switchInput.checked;

  function userStateToggle() {
    isChecked = !isChecked;
    isChecked
      ? (nowLabel.innerHTML = '근무 시작')
      : (nowLabel.innerHTML = '근무 종료');
    switchInput.classList.toggle('active');
    nowLabel.classList.toggle('active');
  }

  nowSwitch.addEventListener('click', userStateToggle);
}

function modalFunc() {
  const workStateModal = document.getElementById('workStateModal');
  const modalBtn = document.querySelector('.time-state .btn');
  const btnClose = document.querySelector('.modal__footer .btn__close');
  const btnSbmit = document.querySelector('.modal__footer .btn__sbmit');

  modalBtn.addEventListener('click', () => workStateModal.showModal());
  btnClose.addEventListener('click', () => workStateModal.close());
  btnSbmit.addEventListener('click', () => workStateModal.close());
}