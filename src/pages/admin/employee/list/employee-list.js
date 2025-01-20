import './employee-list.css';
import rawEmployeeData from '../../../../../server/data/employee-list.json';

//함수 재호출 트리거 함수
const triggerRender = function (content) {
  employeeList(content);
};

const employees = rawEmployeeData.data.map(function (rawEmployee) {
  return `
          <tr>
            <td class="table__name">${rawEmployee.name}</td>
            <td class="table__id">${rawEmployee.id}</td>
            <td class="table__department">${rawEmployee.department}</td>
            <td class="table__position">${rawEmployee.position}</td>
            <td class="table__status">
              <span class="label label--${rawEmployee.status.color}">${rawEmployee.status.title}</span>
            </td>
          </tr>
          `;
});

const listLength = 9;
const initialIndex = 1;
const totalIndex = Math.ceil(employees.length / listLength);
let currentIndex = initialIndex;

export const employeeList = function (content) {
  const paginationBtnsRender = function () {
    const paginationBtnList = [];
    for (let i = 1; i <= totalIndex; i++) {
      paginationBtnList[i] = `<a href="javascript:;"
      data-btn-index = "${i}"
      class="pagination--index ${i == currentIndex ? 'active' : ''}">${i}</a>`;
    }
    return paginationBtnList.join('');
  };

  const paginationBtnsAddEvent = function () {
    const btnObjects = document.querySelectorAll('.pagination--index');
    btnObjects.forEach(function (btnObject) {
      btnObject.addEventListener('click', function () {
        // console.log(btnObject.dataset.btnIndex);
        currentIndex = btnObject.dataset.btnIndex;
        triggerRender(content); // 상태값이 변경되었으므로 페이지 렌더 함수를 재호출
      });
    });
    return;
  };

  const paginationBtns = paginationBtnsRender();

  content.innerHTML = `
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
                사원번호
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
          <tbody>
            ${employees
              .slice(
                (currentIndex - 1) * listLength,
                (currentIndex - 1) * listLength + listLength,
              )
              .join('')}
          </tbody>
        </table>
      </section>

      <section class="pagination">
        <a href="javascript:;" class="pagination--prev">prev</a>
        ${paginationBtns}
        <a href="javascript:;" class="pagination--next">next</a>
      </section>
    </div>
    `;
  paginationBtnsAddEvent();
};
