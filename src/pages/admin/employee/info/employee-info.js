import './employee-info.css';
import axios from 'axios';
import { formatDateTime } from '/src/util/utils.js';

const userId = 2;

const getEmployeeInfo = async function () {
  try {
    const employeeObjects = document.querySelector('#employee-info');
    const response = await axios.get(`/api/user/${userId}`);

    const employeeDetails = response.data[0];
    console.log(employeeDetails);
    employeeObjects.innerHTML = `
    <section class="col-7">
    <div class="box name-photo">
      <div class="name-photo__contents">
        <div class="contents--background-img">
          <img
            src="../../../../${
              employeeDetails.IMG_LOCATION || 'public/images/img_profile.png'
            }"
            alt="profile image"
            class="contents--profile-img"
          />
        </div>
        <h5 class="contents--name">${employeeDetails.NAME}</h5>
        <p class="contents--position">${employeeDetails.DEPARTMENT} ∙ ${
      employeeDetails.POSITION
    }</p>
      </div>
      <div class="name-photo__edit-details">
        <span class="edit-details__date">${formatDateTime(
          employeeDetails.MODIFIED_DATE,
        )} 수정됨</span>
        <button type="button" class="btn btn--primary">
          프로필 사진 수정하기
        </button>
      </div>
    </div>
  </section>
  <section class="col-5">
    <div class="box work-period">
      <div class="box__top">
        <h5 class="box__title">근무 정보</h5>
        <a href="#" class="box__more">
          더보기
        </a>
      </div>
      <div class="box__bottom box__contents">
        <p class="work-period__text">
          ${employeeDetails.SERVICE_YEAR}년 ${employeeDetails.SERVICE_MONTH}개월
        </p>
      </div>
    </div>
    <div class="box contact">
      <div class="box__top">
        <h5 class="box__title">연락처</h5>
        <a href="#" class="box__more">
          더보기
        </a>
      </div>
      <div class="box__bottom box__contents">
        <p class="contact__text">${employeeDetails.CONTACT}</p>
        <p class="contact__text">${employeeDetails.EMAIL}</p>
      </div>
    </div>
    <div class="box performance">
      <div class="box__top">
        <h5 class="box__title">직원평가</h5>
        <a href="#" class="box__more">
          더보기
        </a>
      </div>
      <div class="box__bottom box__contents">
        <p class="performance__text">
          <span class="performance__text--my-rate">${
            employeeDetails.PERFORMANCE_RATE
          }</span>/5
        </p>
      </div>
    </div>
  </section>
  
      `;
  } catch (error) {
    console.error('Error fetching employee data:', error);
    const employeeObjects = document.querySelector('#employee-info');
    if (employeeObjects) {
      employeeObjects.innerHTML =
        '<p>직원 정보를 불러오는 중 오류가 발생했습니다.</p>';
    }
  }
};

const addBtnEventListender = function () {};

export const employeeInfo = function (content) {
  content.innerHTML = `
<div id="employee-info">
  <section class="col-7">
    <div class="box name-photo">
      <div class="name-photo__contents">
        <div class="contents--background-img">
          <img
            src="${'../../../../public/images/img_profile.png'}"
            alt="profile image"
            class="contents--profile-img"
          />
        </div>
        <h5 class="contents--name">${'이름 없음'}</h5>
        <p class="contents--position">${'부서 미지정'} ∙ ${'직책 미지정'}</p>
      </div>
      <div class="name-photo__edit-details">
        <span class="edit-details__date">${'날짜 미지정'} 수정됨</span>
        <div class="edit-details--btns">
          <button type="button" class="btn btn--primary">
            프로필 사진 수정하기
          </button>
          <button type="button" class="btn btn--secondary invisible">
            삭제하기
          </button>
          <button type="button" class="btn btn--secondary invisible">
            저장하기
          </button>
        </div>
      </div>
    </div>
  </section>
  <section class="col-5">
    <div class="box work-period">
      <div class="box__top">
        <h5 class="box__title">근무 정보</h5>
        <a href="#" class="box__more">
          더보기
        </a>
      </div>
      <div class="box__bottom box__contents">
        <p class="work-period__text">
          ${'--'}년 ${'--'}개월
        </p>
      </div>
    </div>
    <div class="box contact">
      <div class="box__top">
        <h5 class="box__title">연락처</h5>
        <a href="#" class="box__more">
          더보기
        </a>
      </div>
      <div class="box__bottom box__contents">
        <p class="contact__text">${'전화번호 없음'}</p>
        <p class="contact__text">${'이메일 없음'}</p>
      </div>
    </div>
    <div class="box performance">
      <div class="box__top">
        <h5 class="box__title">직원평가</h5>
        <a href="#" class="box__more">
          더보기
        </a>
      </div>
      <div class="box__bottom box__contents">
        <p class="performance__text">
          <span class="performance__text--my-rate">${'0'}</span>/5
        </p>
      </div>
    </div>
  </section>
</div>
  `;
  getEmployeeInfo();
};
