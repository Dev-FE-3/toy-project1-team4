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

const listLength = 9; // 한 페이지에 들어갈 직원 수
const indexLength = 8; // pagination bar 에 표시할 최대 인덱스 버튼 개수
const initialIndex = 1; // 처음 접속 시 인덱스 값
const totalIndex = Math.ceil(employees.length / listLength); // 총 인덱스 개수(리스트 요소 개수를 기준)
let paginationBarIndex = 1; // 인덱스 버튼세트 리스트 값 1~8 : 1, 9~16 : 2 ...
let currentIndex = initialIndex;

// console.log(totalIndex);

export const employeeList = function (content) {
  const paginationBtnsRender = function () {
    const paginationBtnList = [];
    for (
      let i = 1 + indexLength * (paginationBarIndex - 1);
      i <= indexLength * paginationBarIndex && i <= totalIndex;
      i++
    ) {
      paginationBtnList[i] = `<a href="javascript:;"
      data-btn-index = "${i}"
      class="pagination--index ${i == currentIndex ? 'active' : ''}">${i}</a>`;
    }
    return paginationBtnList.join('');
  };

  const paginationBtnsAddEvent = function () {
    const indexBtn = document.querySelectorAll('.pagination--index');
    indexBtn.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // console.log(btn.dataset.btnIndex);
        currentIndex = btn.dataset.btnIndex;
        triggerRender(content); // 상태값이 변경되었으므로 페이지 렌더 함수를 재호출
      });
    });

    const moveBtn = {
      prev: document.querySelector('.pagination--prev'),
      next: document.querySelector('.pagination--next'),
    };

    moveBtn.prev.addEventListener('click', function () {
      console.log('prev clicked');
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
