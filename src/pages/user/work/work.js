import { header } from './../../../components/header/header.js';
import { nav } from './../../../components/nav/nav.js';
import './work.css';
import axios from 'axios';
import { formatDateTime, buttonStatusStyle, fetchData } from '/src/util/utils.js';

export const work = async function (content) {
  content.innerHTML = `
    ${await nav()}
    <div class="wrap">
      ${await header()}
      <div class="container">
        <div id="work" class="row">
          <section class="box box--time col-5 col-lg-12 col-md-12">
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
          
          <section class="box col-7 col-lg-12 col-md-12 holiday">
            <div class="box__top">
              <h5 class="box__title">잔여 휴가</h5>
              <a href="#" class="box__more">더보기</a>
            </div>
            <div class="box__bottom">
              <div class="holiday__chart">
                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 144 143" fill="none">
                  <circle cx="71.9999" cy="71.5001" r="71.4999" transform="rotate(-90 71.9999 71.5001)" fill="#EFF4FB"/>
                  <path d="M71.9999 0.00017779C86.5281 0.000179811 100.712 4.42589 112.662 12.688C124.612 20.9501 133.761 32.6565 138.892 46.2485C144.023 59.8404 144.892 74.6729 141.383 88.7708C137.873 102.869 130.153 115.563 119.249 125.164C108.345 134.764 94.7749 140.815 80.346 142.511C65.9172 144.207 51.3141 141.467 38.4813 134.657C25.6484 127.846 15.1948 117.287 8.51242 104.387C1.83001 91.4873 -0.764092 76.8576 1.07554 62.4464L71.9999 71.5001L71.9999 0.00017779Z" fill="#6AD2FF"/>
                  <path d="M71.9999 0.00017779C83.0151 0.000179322 93.8813 2.54519 103.751 7.43668C113.62 12.3282 122.226 19.4338 128.897 28.1993C135.568 36.9647 140.123 47.1529 142.208 57.969C144.292 68.7851 143.85 79.9366 140.914 90.5534C137.979 101.17 132.63 110.965 125.286 119.175C117.941 127.384 108.799 133.785 98.573 137.879C88.3469 141.972 77.3132 143.648 66.3327 142.775C55.3522 141.902 44.7219 138.504 35.2712 132.845L71.9999 71.5001L71.9999 0.00017779Z" fill="#4318FF"/>
                </svg>
              </div>
              <ul class="holiday__left">
                
              </ul>
            </div>
          </section>

          <section class="box col-12 col-lg-12 col-md-12 absence">
            <div class="box__top">
              <h5 class="box__title">부재신청 목록</h5>
              <div>
                <select class="select filterStatus">
                  <option selected="">전체</option>
                  <option value="1">결제 중</option>
                  <option value="2">결제 완료</option>
                  <option value="3">반려됨</option>
                </select>
                <button class="btn btn--primary absence--approve__modal">부재 신청서 작성</button>
              </div>
              <dialog class="absence--modal">
                <div class="absence--title">
                  <h2>근태 신청하기</h2>
                  <form method="dialog">
                    <button class="absence--modal__close"></button>
                  </form>
                </div>
                <div class="absence--propose">
                  <form method="post" class="absence--form">
                    <ul class="absence--propose__info">
                      <li class="input-wrap">
                        <label for="absence--id" class="input-label">사원번호</label>
                        <input type="text" class="input-text absence--id" id="absence--id" placeholder="" disabled>
                      </li>
                      <li class="input-wrap">
                        <label for="absence--start--date" class="input-label">시작일</label>
                        <input type="date" class="input-text absence--start--date" id="absence--start--date" placeholder="">
                      </li>
                      <li class="input-wrap">
                        <label for="absence--end--date" class="input-label">종료일</label>
                        <input type="date" class="input-text absence--end--date" id="absence--end--date" placeholder="">
                      </li>
                      <li class="input-wrap">
                        <label for="absence--type" class="input-label">근태 유형</label>
                        <select id="absence--type" class="select absence--type">
                        <option value="연차 휴가">연차 휴가</option>
                        <option value="보상 휴가">보상 휴가</option>
                        <option value="기타 휴가">기타 휴가</option>
                        </select>
                      </li>
                      <li class="input-wrap">
                        <label for="absence-reason" class="input-label">신청 사유</label>
                        <textarea class="input-text input-text--textarea" id="absence-reason" rows="3"></textarea>
                      </li>
                      <li class="input-wrap">
                        <input type=submit value="제출하기" class="btn btn--primary absence--submit">
                        <span>기타 문의는 <strong>인사팀</strong>에 부탁드립니다</span>
                      </li>
                    </ul>
                  <form>
                </div>
              </dialog>
            </div>
            <div class="box__bottom">
              <table class="table table--center absence--list">
                <thead>
                  <tr>
                    <th scope="col">신청자</th>
                    <th scope="col">근태 날짜</th>
                    <th scope="col">근태 유형</th>
                    <th scope="col">결제 상태</th>
                  </tr>
                </thead>
                <tbody class="absence--list__content">
                  
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
    
  `;

  // 초기 데이터 로드
  initializePage();
  activateAbsenceModalButton();
  activateAbsenceFormButtion();
};

async function initializePage() {
  // Promise.all 사용
  const [holiday, absence] = await Promise.all([fetchData('api/work', 'post', { num: sessionStorage.getItem('num') }), fetchData('api/absence', 'post', { num: sessionStorage.getItem('num') })]);

  listingHoliday(holiday);
  listingAbsenceList(absence);
  filterStatus(absence);
}

//남은 휴가
function listingHoliday(holiday) {
  const leftAnnual = document.querySelector('.holiday__left');

  leftAnnual.innerHTML = holiday
    .map(item => {
      return `
      <li class="${dayoffStyle(`${item.TYPE}`)}">
        <h6>${item.TYPE}</h6>
        <strong>${item.AMOUNT}일</strong>
      </li>
    `;
    })
    .join('');
}

// 휴가별 Styling, 추후 다른 폴더로 이동 (상수, ENUM)
function dayoffStyle(str) {
  switch (str) {
    case '연차휴가':
      str = 'left__annual';
      break;
    case '보상휴가':
      str = 'left__compensatory';
      break;
    case '기타휴가':
      str = 'left__etc';
      break;
  }
  return str;
}

//부재 신청 목록
function listingAbsenceList(absence) {
  const absenceList = document.querySelector('.absence--list__content');

  absenceList.innerHTML = absence
    .map(item => {
      const startDate = formatDateTime(`${item.START_DATE}`);
      const endDate = formatDateTime(`${item.END_DATE}`);
      const statusStyle = buttonStatusStyle('approve', `${item.STATUS}`);

      return `
      <tr>
        <td>${sessionStorage.getItem('name')}</td>
        <td>${startDate} ~ ${endDate}</td>
        <td>${item.TYPE}</td>
        <td><span class="label ${statusStyle}">${item.STATUS}</span></td>
      </tr>
    `;
    })
    .join('');
}

//결제 상태에 따른 필터링
function filterStatus(absence) {
  const filterStatus = document.querySelector('.filterStatus');

  filterStatus.addEventListener('change', function () {
    // select element에서 선택된 option의 text가 저장된다.
    const selectText = filterStatus.options[filterStatus.selectedIndex].text;

    changeAbsenceList(selectText, absence);
  });
}

// 필터링 된 리스트를 뿌려준다
function changeAbsenceList(selectText, absence) {
  // const arrayLength = document.querySelector('.absence--list__content').childElementCount;
  const filterAbsence = absence.filter(item => item.STATUS === selectText);

  selectText === '전체' ? listingAbsenceList(absence) : listingAbsenceList(filterAbsence);
}

function activateAbsenceModalButton() {
  //부재 신청서 버튼 클릭시 modal & 스크롤 방지
  const modalBtn = document.querySelector('.absence--approve__modal');
  const modal = document.querySelector('.absence--modal');
  const userNum = document.querySelector('#absence--id');
  const absenceModalClose = document.querySelector('.absence--modal__close');

  modalBtn.addEventListener('click', function () {
    modal.showModal();
    modal.classList.add('absence--show');
    document.body.style.overflow = 'hidden';
    userNum.value = sessionStorage.getItem('num');
  });

  absenceModalClose.addEventListener('click', function () {
    modal.classList.remove('absence--show');

    // absence--modal transition 시간과 맞추기
    setTimeout(function () {
      modal.close();
    }, 600);
  });

  modal.addEventListener('close', function () {
    document.body.style.overflow = 'auto';
    // 모달이 닫힌 후 UI 갱신
    initializePage();
  });
}

function activateAbsenceFormButtion() {
  const absenceForm = document.querySelector('.absence--form');
  const modal = document.querySelector('.absence--modal');
  //input type=date에 click 이벤트 주기
  const absenceStartDate = document.querySelector('.absence--start--date');
  const absenceEndDate = document.querySelector('.absence--end--date');

  absenceStartDate.addEventListener('click', function () {
    absenceStartDate.showPicker();
  });

  absenceEndDate.addEventListener('click', function () {
    absenceEndDate.showPicker();
  });

  //신청하기 버튼 클릭 Logic
  const absenceSubmit = document.querySelector('.absence--submit');

  absenceSubmit.addEventListener('click', async function () {
    const absence = {
      num: document.querySelector('#absence--id').value,
      start_date: document.querySelector('#absence--start--date').value,
      end_date: document.querySelector('#absence--end--date').value,
      type: document.querySelector('#absence--type').value,
      reason: document.querySelector('#absence-reason').value,
      status: '결제 중',
    };

    try {
      await axios.post('/api/approve', absence);
      alert('신청이 완료되었습니다.');
      absenceForm.reset();
      modal.close();
    } catch (error) {
      // 오류 처리
      console.error('Form submission error:', error);
      alert('신청에 실패했습니다. 다시 시도해주세요.');
    } finally {
    }
  });
}
