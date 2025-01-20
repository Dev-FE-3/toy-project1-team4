import './home.css';
import homeJson from './../../../../server/data/home.json';

export const home = function (content) {
  const user = homeJson.user;
  const graph = homeJson.graph;
  const work = homeJson.work;
  const notice = homeJson.notice;
  const meeting = homeJson.meeting;

  const graphItems = graph.bar.map((item) => `
    <li class="graph__item">
      <div class="graph__bar" style="height: ${item.height}%"></div>
      <span class="graph__title">${item.title}</span>
    </li>
  `).join('');

  const workItems = work.map((item) => `
    <tr>
      <td>${item.date}</td>
      <td>${item.type}</td>
      <td><span class="label label--${item.label === true ? 'purple' : 'green'}">${item.state}</span></td>
    </tr>
  `).join('');

  const noticeItems = notice.map((item) => `
    <li><a href="#">${item}</a></li>
  `).join('');

  const meetingItems = meeting.map((item) => `
    <li class="meeting-list__item">
      <a href="#" class="item__link">
        <p class="item__title">${item.title}</p>
        <span class="item__time">${item.time}</span>
      </a>
    </li>
  `).join('');

  content.innerHTML = `
    <div id="home" class="row">
      <section class="box box--user col-3">
        <div class="box__bottom">
          <img src="${user.imgSrc}" class="user-img" alt="profile">
          <div class="user-info">
            <span class="user-info__name">${user.name}</span>
            <span class="user-info__position">${user.position}</span>
          </div>
        </div>
      </section>
      <section class="box box--graph col-5">
        <div class="box__top">
          <h5 class="box__title">이번주 근무 시간</h5>
          <a href="#" class="box__more">더보기</a>
        </div>
        <div class="box__bottom">
          <span class="graph__time">${graph.time}</span>
          <ul class="graph__list">
            ${graphItems}
          </ul>
        </div>
      </section>
      <section class="box box--time col-4">
        <div class="box__top">
          <h5 class="box__title">남은 근무시간</h5>
          <a href="#" class="box__more">더보기</a>
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
          <a href="#" class="box__more">더보기</a>
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
            <tbody>
              ${workItems}
            </tbody>
          </table>
        </div>
      </section>
      <section class="box box--notice col-4">
        <div class="box__top">
          <h5 class="box__title">사내 공지</h5>
          <a href="#" class="box__more">더보기</a>
        </div>
        <div class="box__bottom">
          <ul class="notice-list">
            ${noticeItems}
          </ul>
        </div>
      </section>
      <section class="box box--meeting col-3">
        <div class="box__top">
          <h5 class="box__title">1월 10일</h5>
          <a href="#" class="box__more">더보기</a>
        </div>
        <div class="box__bottom">
          <ul class="meeting-list">
            ${meetingItems}
          </ul>
        </div>
      </section>
    </div>
  `;

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

  function userStateFunc () {
    if (switchInput.checked === true) {
      nowLabel.innerHTML = '근무 시작'
      nowLabel.classList.add('active')
    } else {
      nowLabel.innerHTML = '근무 종료'
      nowLabel.classList.remove('active')
    };
  };

  nowSwitch.addEventListener('click', function () {
    userStateFunc();
  });

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