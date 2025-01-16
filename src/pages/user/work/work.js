import './work.css';

export const work = function (content) {

  content.innerHTML = `
    <div id="work" class="row">
      <section class="box col-5">
        <div class="box__top">
          <h5 class="box__title">이번주 근무 시간</h5>
          <a href="#" class="box__more">더보기</a>
        </div>
        <div class="box__bottom">
          내용
        </div>
      </section>

      <section class="box col-7 holiday">
        <div class="box__top">
          <h5 class="box__title">잔여 휴가</h5>
          <a href="#" class="sbox__more">더보기</a>
        </div>
        <div class="box__bottom">
          <div class="holiday__chart">
            <svg xmlns="http://www.w3.org/2000/svg" width="144" height="143" viewBox="0 0 144 143" fill="none">
              <circle cx="71.9999" cy="71.5001" r="71.4999" transform="rotate(-90 71.9999 71.5001)" fill="#EFF4FB"/>
              <path d="M71.9999 0.00017779C86.5281 0.000179811 100.712 4.42589 112.662 12.688C124.612 20.9501 133.761 32.6565 138.892 46.2485C144.023 59.8404 144.892 74.6729 141.383 88.7708C137.873 102.869 130.153 115.563 119.249 125.164C108.345 134.764 94.7749 140.815 80.346 142.511C65.9172 144.207 51.3141 141.467 38.4813 134.657C25.6484 127.846 15.1948 117.287 8.51242 104.387C1.83001 91.4873 -0.764092 76.8576 1.07554 62.4464L71.9999 71.5001L71.9999 0.00017779Z" fill="#6AD2FF"/>
              <path d="M71.9999 0.00017779C83.0151 0.000179322 93.8813 2.54519 103.751 7.43668C113.62 12.3282 122.226 19.4338 128.897 28.1993C135.568 36.9647 140.123 47.1529 142.208 57.969C144.292 68.7851 143.85 79.9366 140.914 90.5534C137.979 101.17 132.63 110.965 125.286 119.175C117.941 127.384 108.799 133.785 98.573 137.879C88.3469 141.972 77.3132 143.648 66.3327 142.775C55.3522 141.902 44.7219 138.504 35.2712 132.845L71.9999 71.5001L71.9999 0.00017779Z" fill="#4318FF"/>
            </svg>
          </div>
          <div class="holiday__left">
            <div class="left__annual">
              <p>연차휴가</p>
              <strong>9일</strong>
            </div>
            <div class="left__compensatory">
              <p>보상휴가</p>
              <strong>3일</strong>
            </div>
            <div class="left__etc">
              <p>기타휴가</p>
              <strong>3일</strong>            
            </div>
          </div>
        </div>
      </section>

      <section class="box col-12 absence">
        <div class="box__top">
          <h5 class="box__title">부재신청 목록</h5>
          <button class="btn btn--primary approve">부재 신청서 작성</button>
        </div>
        <div class="box__bottom">
          <table class="table absence--list">
            <thead>
              <tr>
                <th scope="col">신청자</th>
                <th scope="col">근태 날짜</th>
                <th scope="col">근태 유형</th>
                <th scope="col">결제 상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jeffrey Bezos</td>
                <td>2025-01-01</td>
                <td>연차</td>
                <td><span class="label label--red">결근</span></td>
              </tr>
              <tr>
                <td>Jeffrey Bezos</td>
                <td>2025-01-01</td>
                <td>연차</td>
                <td><span class="label label--orange">휴가</span></td>
              </tr>
              <tr>
                <td>Jeffrey Bezos</td>
                <td>2025-01-01</td>
                <td>연차</td>
                <td><span class="label label--green">근무중</span></td>
              </tr>
              <tr>
                <td>Jeffrey Bezos</td>
                <td>2025-01-01</td>
                <td>연차</td>
                <td><span class="label label--purple">자리비움</span></td>
              </tr>
                            <tr>
                <td>Jeffrey Bezos</td>
                <td>2025-01-01</td>
                <td>연차</td>
                <td><span class="label label--purple">자리비움</span></td>
              </tr>
                            <tr>
                <td>Jeffrey Bezos</td>
                <td>2025-01-01</td>
                <td>연차</td>
                <td><span class="label label--purple">자리비움</span></td>
              </tr>
                            <tr>
                <td>Jeffrey Bezos</td>
                <td>2025-01-01</td>
                <td>연차</td>
                <td><span class="label label--purple">자리비움</span></td>
              </tr>
                            <tr>
                <td>Jeffrey Bezos</td>
                <td>2025-01-01</td>
                <td>연차</td>
                <td><span class="label label--purple">자리비움</span></td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      // 신청서 modal 




    </div>
  `;

  // 잔여 휴가 기능 API

  // 휴가 일자에 따른 차트 동적 바인딩



  //부재 신청 목록 API


  //부재 신청 목록 스크롤 기능




  //부재 신청서 작성 버튼
  const approve = document.querySelector('.approve');

  approve.addEventListener('click', function () {
    //모달 창 구현
  })

  //부재 신청서 작성 



}