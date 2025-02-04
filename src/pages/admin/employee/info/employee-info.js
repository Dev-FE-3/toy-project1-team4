import { header } from './../../../../components/header/header.js';
import { nav } from './../../../../components/nav/nav.js';
import './employee-info.css';
import { formatDateTime, fetchData } from '/src/util/utils.js';

const getEmployeeInfo = async function () {
  try {
    const employeeObjects = document.querySelector('#employee-info');
    const response = await fetchData(`/api/user/${history.state}`);

    const employeeDetails = response[0];
    employeeObjects.innerHTML = `
    <section class="col-7 col-md-12">
    <div class="box name-photo">
      <div class="name-photo__contents">
        <div class="contents--background-img">
          <img
            src="../../../../${employeeDetails.IMG_LOCATION}"
            alt="profile image"
            class="contents--profile-img"
          />
        </div>
        <h5 class="contents--name">${employeeDetails.NAME}</h5>
        <p class="contents--position">${employeeDetails.DEPARTMENT} ∙ ${employeeDetails.POSITION}</p>
      </div>
      <div class="name-photo__edit-details">
        <span class="edit-details__date">${formatDateTime(employeeDetails.MODIFIED_DATE)} 수정됨</span>
        <button type="button" class="btn btn--primary btn--edit-change">
          프로필 사진 수정하기
        </button>
        <!--<button type="button" class="btn btn--secondary btn--edit-remove">
          삭제하기
        </button>
        <button type="button" class="btn btn--secondary btn--edit-save">
          저장하기
        </button>-->
        <input type="file" class="btn--file-input" accept="image/*"/>
      </div>
    </div>
  </section>
  <section class="col-5 col-md-12">
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
          <span class="performance__text--my-rate">${employeeDetails.PERFORMANCE_RATE}</span>/5
        </p>
      </div>
    </div>
  </section>
      `;
    attachChangeProfilePictureEvent();
  } catch (error) {
    console.error('Error fetching employee data:', error);
    const employeeObjects = document.querySelector('#employee-info');
    if (employeeObjects) {
      employeeObjects.innerHTML = '<p>직원 정보를 불러오는 중 오류가 발생했습니다.</p>';
    }
  }
};

const attachChangeProfilePictureEvent = function () {
  const changeButton = document.querySelector('.btn--edit-change');
  const fileInput = document.querySelector('.btn--file-input');
  changeButton.addEventListener('click', () => {
    fileInput.click();
  });
  fileInput.addEventListener('click', event => event.stopImmediatePropagation());
  fileInput.addEventListener('change', async event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function () {
        const base64String = reader.result.split(',')[1];
        try {
          // console.log(userId, base64String, file.name, file.size);
          fetchData(
            '/api/profile',
            'POST',
            {
              userNum: history.state,
              image: base64String,
              imageName: file.name,
            }
          );
          alert('프로필 사진이 성공적으로 업데이트되었습니다.');
          getEmployeeInfo();
        } catch (error) {
          console.error('Error uploading profile picture:', error);
          alert('프로필 사진 업로드 중 오류가 발생했습니다.');
        }
      };
      reader.readAsDataURL(file);
    }
  });
};

export const employeeInfo = async function (content) {
  content.innerHTML = `
    ${await nav()}
    <div class="wrap">
      ${await header()}
      <div class="container">
        <div id="employee-info" class="row">
          <section class="col-7 col-md-12">
            <div class="box name-photo">
              <div class="name-photo__contents">
                <div class="contents--background-img"></div>
              </div>
              <div class="name-photo__edit-details">
                <span class="edit-details__date">${'수정 날짜 미지정'}</span>
                <div class="edit-details--btns">
                  <button type="button" class="btn btn--primary">
                    프로필 사진 수정하기
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section class="col-5 col-md-12">
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
      </div>
    </div>
  `;
  getEmployeeInfo();
};
