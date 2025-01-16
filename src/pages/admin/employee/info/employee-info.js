import './employee-info.css';

export const employeeInfo = function (content) {
  const serviceYears = 2;
  const serviceMonths = 5;
  const conatctCall = '010-1234-5678';
  const conatctEmail = 'jeff@amazon.com';
  const performanceRate = 4.5;

  content.innerHTML = `
<div id="employee-info">
  <section class="col-7">
    <div class="box name-photo">
      <div class="name-photo__contents">
        <div class="contents--background-img">
          <img
            src="../../../../../public/images/profile_face.png"
            alt="profile image"
            class="contents--profile-img"
          />
        </div>
        <h5 class="contents--name">Jeffrey Bezos</h5>
        <p class="contents--position">CS 팀 ∙ 고객 성공 매니저</p>
      </div>
      <div class="name-photo__edit-details">
        <span class="edit-details__date">2024.12.03 수정됨</span>
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
          ${serviceYears}년 ${serviceMonths}개월
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
        <p class="contact__text">${conatctCall}</p>
        <p class="contact__text">${conatctEmail}</p>
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
          <span class="performance__text--my-rate">${performanceRate}</span>/5
        </p>
      </div>
    </div>
  </section>
</div>
  `;
};
