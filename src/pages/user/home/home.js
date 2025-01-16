import './home.css';

export const home = function (content) {

  content.innerHTML = `
    <div id="home" class="row">
      <section class="box box--user col-3">
        <div class="box__bottom">
          <img src="./../../../public/images/img_profile.png" class="user-img" alt="">
          <div class="user-info">
            <span class="user-info__name">김빵긋</span>
            <span class="user-info__position">CS 팀 ∙ 고객 성공 매니저</span>
          </div>
        </div>
      </section>
      <section class="box box--graph col-5">
        <div class="box__top">
          <h5 class="box__title">이번주 근무 시간</h5>
          <a href="#" class="box__more">더보기</a>
        </div>
        <div class="box__bottom">
          <span class="graph__time">25시간 39분</span>
          <ul class="graph__list">
            <li class="graph__item">
              <div class="graph__bar"></div>
              <span class="graph__title">01/08</span>
            </li>
            <li class="graph__item">
              <div class="graph__bar"></div>
              <span class="graph__title">01/09</span>
            </li>
            <li class="graph__item">
              <div class="graph__bar"></div>
              <span class="graph__title">01/10</span>
            </li>
            <li class="graph__item">
              <div class="graph__bar"></div>
              <span class="graph__title">01/11</span>
            </li>
            <li class="graph__item">
              <div class="graph__bar"></div>
              <span class="graph__title">01/12</span>
            </li>
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
            <span class="time-view__now">현재 시각: <b class="time">00:00</b></span>
          </div>
          <div class="time-state">
            <div class="time-state__now">
              <span class="now__title">현재 상태</span>
              <span class="now__label">외출중</span>
            </div>
            <button type="button" class="btn btn--primary">근무 시작</button>
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
              <tr>
                <td>2025-01-08</td>
                <td>연차휴가</td>
                <td><span class="label label--purple">결재중</span></td>
              </tr>
              <tr>
                <td>2024-09-12</td>
                <td>병가</td>
                <td><span class="label label--green">결재완료</span></td>
              </tr>
              <tr>
                <td>2024-08-10</td>
                <td>조퇴</td>
                <td><span class="label label--green">결재완료</span></td>
              </tr>
              <tr>
                <td>2024-07-02</td>
                <td>조퇴</td>
                <td><span class="label label--green">결재완료</span></td>
              </tr>
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
            <li><a href="#">[개발팀] 신규 프로젝트 런칭 안내: Project Phoenix]</a></li>
            <li><a href="#">[개발팀] 신규 프로젝트 런칭 안내: Project Phoenix]</a></li>
            <li><a href="#">[인사팀] 2025년 상반기 워크숍 일정 안내</a></li>
            <li><a href="#">[인사팀] 2025년 상반기 워크숍 일정 안내</a></li>
            <li><a href="#">[인사팀] 2025년 상반기 워크숍 일정 안내</a></li>
            <li><a href="#">[인사팀] 2025년 상반기 워크숍 일정 안내</a></li>
            <li><a href="#">[인사팀] 2025년 상반기 워크숍 일정 안내</a></li>
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
            <li class="meeting-list__item">
              <a href="#" class="item__link">
                <p class="item__title">데일리 스크럼</p>
                <span class="item__time">10:00 AM - 11:00 AM</span>
              </a>
            </li>
            <li class="meeting-list__item">
              <a href="#" class="item__link">
                <p class="item__title">데일리 스크럼</p>
                <span class="item__time">01:00 PM - 02:00 PM</span>
              </a>
            </li>
            <li class="meeting-list__item">
              <a href="#" class="item__link">
                <p class="item__title">Swift 세미나</p>
                <span class="item__time">02:00 PM - 03:00 PM</span>
              </a>
            </li>
            <li class="meeting-list__item">
              <a href="#" class="item__link">
                <p class="item__title">사내 독서 모임</p>
                <span class="item__time">06:00 PM - 07:00 PM</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  `;

  function graphFunc () {
    const graphList = document.querySelector('.box--graph .graph__list')
    const graphItems = graphList.querySelectorAll('.graph__item')
  
    graphItems.forEach((item) => {
      item.querySelector('.graph__bar').classList.add('active')
    })
  }
  
  function timerFunc () {
    let date = new Date()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    const boxTime = document.querySelector('#home .box--time')
    const time = boxTime.querySelector('.time-view .time')

    time.innerHTML = `${hours}:${minutes}:${seconds} `
  }

  timerFunc()
  setInterval(timerFunc, 1000)
  
  window.onload = function() {
    graphFunc()
  }
}