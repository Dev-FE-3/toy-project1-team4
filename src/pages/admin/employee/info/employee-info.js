import './employee-info.css';
import employeeDetails from '../../../../../server/data/employee-info.json';

employeeDetails = employeeDetails.data;

export const employeeInfo = function (content) {
  content.innerHTML = `
<div id="employee-info">
  <section class="col-7">
    <div class="box name-photo">
      <div class="name-photo__contents">
        <div class="contents--background-img">
          <img
            src="${employeeDetails.profileSrc}"
            alt="profile image"
            class="contents--profile-img"
          />
        </div>
        <h5 class="contents--name">${employeeDetails.name}</h5>
        <p class="contents--position">${employeeDetails.department} ∙ ${employeeDetails.position}</p>
      </div>
      <div class="name-photo__edit-details">
        <span class="edit-details__date">${employeeDetails.editedDate} 수정됨</span>
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
          ${employeeDetails.serviceYears}년 ${employeeDetails.serviceMonths}개월
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
        <p class="contact__text">${employeeDetails.contactCall}</p>
        <p class="contact__text">${employeeDetails.contactEmail}</p>
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
          <span class="performance__text--my-rate">${employeeDetails.performanceRate}</span>/5
        </p>
      </div>
    </div>
  </section>
</div>
  `;
};
