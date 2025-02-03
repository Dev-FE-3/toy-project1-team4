import { header } from './../../../../components/header/header.js';
import { nav } from './../../../../components/nav/nav.js';
import { buttonStatusStyle, fetchData } from '../../../../util/utils.js';
import './employee-list.css';
import { route } from '/src/router/router.js';

const listLength = 9; // 한 페이지에 들어갈 직원 수
const indexLength = 8; // pagination bar 에 표시할 최대 인덱스 버튼 개수
const initialIndex = 1; // 처음 접속 시 인덱스 값
let cachedEmployees = null;
let totalIndex = 1; // 총 인덱스 개수(리스트 요소 개수를 기준)
let paginationBarIndex = 1; // 인덱스 버튼세트 리스트 값 1~8 : 1, 9~16 : 2 ...
let currentIndex = initialIndex;

//함수 재호출 트리거 함수
const triggerRender = function (content) {
  employeeList(content);
  return;
};

const makeEmployees = async function () {
  let employeeHtmlList = null;
  //이전 통신에서 불러온 직원 목록 데이터가 있는 경우 불러온 뒤 통신 생략
  if (cachedEmployees == null) {
    const response = await fetchData('/api/users');
    employeeHtmlList = response.map(function (item) {
      return `
            <tr>
              <td class="table__num">${item.NUM}</td>
              <td class="table__name">${item.NAME}</td>
              <td class="table__id">${item.ID}</td>
              <td class="table__department">${item.DEPARTMENT}</td>
              <td class="table__position">${item.POSITION}</td>
              <td class="table__status">
                <span class="label ${buttonStatusStyle('work', item.WORKING_STATUS)}">${item.WORKING_STATUS}</span>
              </td>
            </tr>
            `;
    });
    cachedEmployees = employeeHtmlList;
  } else {
    employeeHtmlList = cachedEmployees;
  }
  totalIndex = Math.max(1, Math.ceil(employeeHtmlList.length / listLength));
  const employeeHtmlResult = employeeHtmlList.slice((currentIndex - 1) * listLength, (currentIndex - 1) * listLength + listLength).join('');
  return employeeHtmlResult;
};

const putEmployees = async function () {
  const employeeListTable = document.querySelector('.table__employee-list');
  const employeeHtmlResult = await makeEmployees();

  employeeListTable.innerHTML = employeeHtmlResult;
  return;
};

const renderPaginationBtns = function () {
  const paginationBtnList = [];
  for (let i = 1 + indexLength * (paginationBarIndex - 1); i <= indexLength * paginationBarIndex && i <= totalIndex; i++) {
    paginationBtnList.push(`<button type="button"
    data-btn-index = "${i}"
    class="pagination--index ${i == currentIndex ? 'active' : ''}">${i}</button>`);
  }
  return `<button type="button" class="pagination--prev">prev</button> 
          ${paginationBtnList.join('')} 
          <button type="button" class="pagination--next">next</button>`;
};

const putPaginationBtns = async function () {
  const paginationBtnContainer = document.querySelector('#employee-list .pagination');
  const paginationBtns = await renderPaginationBtns();
  paginationBtnContainer.innerHTML = paginationBtns;
  return;
};

export const employeeList = async function (content) {
  const paginationBtnsAddEvent = async function () {
    const indexBtn = document.querySelectorAll('.pagination--index');
    indexBtn.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentIndex = Number(btn.dataset.btnIndex);
        triggerRender(content); // 상태값이 변경되었으므로 페이지 렌더 함수를 재호출
      });
    });

    const moveBtn = {
      prev: document.querySelector('.pagination--prev'),
      next: document.querySelector('.pagination--next'),
    };

    moveBtn.prev.addEventListener('click', function () {
      if (currentIndex > indexLength) {
        currentIndex -= indexLength;
        paginationBarIndex--;
      } else {
        currentIndex = 1;
        paginationBarIndex = 1;
      }

      triggerRender(content);
    });
    moveBtn.next.addEventListener('click', function () {
      if (currentIndex + indexLength <= totalIndex) {
        currentIndex += indexLength;
        paginationBarIndex++;
      } else {
        currentIndex = totalIndex;
      }
      triggerRender(content);
    });
    return;
  };

  content.innerHTML = `
    ${await nav()}
    <div class="wrap">
      ${await header()}
      <div class="container">
        <div id="employee-list">
          <section class="box" id="employee-tile">
            <div id="employee-tile__action-button">
              <div class="button-container">
                <button type="button" class="btn btn--primary">편집하기</button>
              </div>
              <div class="button-container">
                <button type="button" class="btn btn--secondary">csv 저장</button>
                <button type="button" class="btn btn--secondary">excel 저장</button>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="table__num">
                    사원번호
                  </th>
                  <th scope="col" class="table__name">
                    이름
                  </th>
                  <th scope="col" class="table__id">
                    아이디
                  </th>
                  <th scope="col" class="table__department">
                    소속
                  </th>
                  <th scope="col" class="table__position">
                    직급
                  </th>
                  <th scope="col" class="table__status">
                    근무 상태
                  </th>
                </tr>
              </thead>
              <tbody class="table__employee-list">
                <tr>
                  <td class="table__name">로딩중..</td>
                  <td class="table__id"></td>
                  <td class="table__department"></td>
                  <td class="table__position"></td>
                  <td class="table__status">
                    <span class="label label--green">근무상태</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section class="pagination">
            <button type="button" class="pagination--prev">prev</button> 
            <button type="button" class="pagination--index active">1</button>
            <button type="button" class="pagination--index">2</button>
            <button type="button" class="pagination--index">3</button>
            <button type="button" class="pagination--next">next</button>
          </section>
        </div>
      </div>
    </div>
    `;
  await putEmployees();
  await putPaginationBtns();
  paginationBtnsAddEvent();
  employeeInfoCheck();
};

//직원 리스트 클릭하였을때 직원 상세로 이동
function employeeInfoCheck() {
  const employeeList = document.querySelector('.table__employee-list');
  employeeList.addEventListener('click', function (event) {
    const employeeNum = event.target.parentElement.querySelector('.table__num').innerText;

    history.pushState(employeeNum, null, '/admin/employee-info');
    route();
  });
}
