import { header } from './../../../../components/header/header.js';
import { nav } from './../../../../components/nav/nav.js';
import { workStatusStyle } from '../../../../util/utils.js';
import './employee-list.css';
import axios from 'axios';

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

const getEmployees = async function () {
  try {
    const response = await axios.get('/api/users');
    const employeeDataList = response.data;
    const employeeHtmlList = employeeDataList.map(function (item) {
      return `
            <tr>
              <td class="table__name">${item.NAME}</td>
              <td class="table__id">${item.ID}</td>
              <td class="table__department">${item.DEPARTMENT}</td>
              <td class="table__position">${item.POSITION}</td>
              <td class="table__status">
                <span class="label ${workStatusStyle(item.WORKING_STATUS)}">${item.WORKING_STATUS}</span>
              </td>
            </tr>
            `;
    });
    cachedEmployees = employeeHtmlList;
    return employeeHtmlList;
  } catch (error) {
    console.error('Error occurred:', error);
    return [];
  }
};

const makeEmployees = async function (content) {
  let employeeHtmlList = null;
  if (cachedEmployees == null) {
    employeeHtmlList = await getEmployees();
  } else {
    employeeHtmlList = cachedEmployees;
  }
  totalIndex = Math.ceil(employeeHtmlList.length / listLength);
  const employeeHtmlResult = employeeHtmlList.slice((currentIndex - 1) * listLength, (currentIndex - 1) * listLength + listLength).join('');
  // triggerRender(content);
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
    paginationBtnList[i] = `<a href="javascript:;"
    data-btn-index = "${i}"
    class="pagination--index ${i == currentIndex ? 'active' : ''}">${i}</a>`;
  }
  return `<a href="javascript:;" class="pagination--prev">prev</a> 
          ${paginationBtnList.join('')} 
          <a href="javascript:;" class="pagination--next">next</a>`;
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
        currentIndex = btn.dataset.btnIndex;
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
      }

      triggerRender(content);
    });
    moveBtn.next.addEventListener('click', function () {
      if (totalIndex > indexLength) {
        if (currentIndex > Math.floor(totalIndex / indexLength) * indexLength) {
          currentIndex = totalIndex;
        } else {
          currentIndex = indexLength * paginationBarIndex + 1;
          paginationBarIndex++;
        }
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
                <button type="button" class="btn btn--secondary">csv 저장</button>
                <button type="button" class="btn btn--secondary">excel 저장</button>
              </div>
              <div class="button-container">
                <button type="button" class="btn btn--primary">직원 목록 편집</button>
              </div>
            </div>
            <table class="table">
              <thead>
                <tr>
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
            <a href="javascript:;" class="pagination--prev">prev</a> 
            <a href="javascript:;" class="pagination--index active">1</a>
            <a href="javascript:;" class="pagination--index">2</a>
            <a href="javascript:;" class="pagination--index">3</a>
            <a href="javascript:;" class="pagination--next">next</a>
          </section>
        </div>
      </div>
    </div>
    `;
  await putEmployees();
  await putPaginationBtns();
  paginationBtnsAddEvent();
  return;
};
