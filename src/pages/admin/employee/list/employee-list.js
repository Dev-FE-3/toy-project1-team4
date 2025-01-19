import './employee-list.css';

//가짜데이터 삽입하여 테스트함.
const rawEmployeeData = [
  {
    name: '송하영',
    id: '12345678',
    department: '인사팀',
    position: '대리',
    status: { color: 'red', title: '결근' },
  },
  {
    name: '백지헌',
    id: '12342516',
    department: '기술지원팀',
    position: '팀장',
    status: { color: 'orange', title: '휴가' },
  },
  {
    name: '박지원',
    id: '19293847',
    department: '회계팀',
    position: '사원',
    status: { color: 'green', title: '근무중' },
  },
  {
    name: '이채영',
    id: '19293847',
    department: '회계팀',
    position: '사원',
    status: { color: 'purple', title: '근무중' },
  },
  {
    name: '송하영',
    id: '12345678',
    department: '인사팀',
    position: '대리',
    status: { color: 'red', title: '결근' },
  },
  {
    name: '백지헌',
    id: '12342516',
    department: '기술지원팀',
    position: '팀장',
    status: { color: 'orange', title: '휴가' },
  },
  {
    name: '박지원',
    id: '19293847',
    department: '회계팀',
    position: '사원',
    status: { color: 'green', title: '근무중' },
  },
  {
    name: '이채영',
    id: '19293847',
    department: '회계팀',
    position: '사원',
    status: { color: 'purple', title: '근무중' },
  },
  {
    name: '송하영',
    id: '12345678',
    department: '인사팀',
    position: '대리',
    status: { color: 'red', title: '결근' },
  },
  {
    name: '백지헌',
    id: '12342516',
    department: '기술지원팀',
    position: '팀장',
    status: { color: 'orange', title: '휴가' },
  },
  {
    name: '박지원',
    id: '19293847',
    department: '회계팀',
    position: '사원',
    status: { color: 'green', title: '근무중' },
  },
  {
    name: '이채영',
    id: '19293847',
    department: '회계팀',
    position: '사원',
    status: { color: 'purple', title: '근무중' },
  },
  {
    name: '송하영',
    id: '12345678',
    department: '인사팀',
    position: '대리',
    status: { color: 'red', title: '결근' },
  },
  {
    name: '백지헌',
    id: '12342516',
    department: '기술지원팀',
    position: '팀장',
    status: { color: 'orange', title: '휴가' },
  },
  {
    name: '박지원',
    id: '19293847',
    department: '회계팀',
    position: '사원',
    status: { color: 'green', title: '근무중' },
  },
  {
    name: '송하영',
    id: '12345678',
    department: '인사팀',
    position: '대리',
    status: { color: 'red', title: '결근' },
  },
  {
    name: '백지헌',
    id: '12342516',
    department: '기술지원팀',
    position: '팀장',
    status: { color: 'orange', title: '휴가' },
  },
  {
    name: '박지원',
    id: '19293847',
    department: '회계팀',
    position: '사원',
    status: { color: 'green', title: '근무중' },
  },
  {
    name: '송하영',
    id: '12345678',
    department: '인사팀',
    position: '대리',
    status: { color: 'red', title: '결근' },
  },
  {
    name: '백지헌',
    id: '12342516',
    department: '기술지원팀',
    position: '팀장',
    status: { color: 'orange', title: '휴가' },
  },
  {
    name: '박지원',
    id: '19293847',
    department: '회계팀',
    position: '사원',
    status: { color: 'green', title: '근무중' },
  },
  {
    name: '송하영',
    id: '12345678',
    department: '인사팀',
    position: '대리',
    status: { color: 'red', title: '결근' },
  },
  {
    name: '백지헌',
    id: '12342516',
    department: '기술지원팀',
    position: '팀장',
    status: { color: 'orange', title: '휴가' },
  },
  {
    name: '박지원',
    id: '19293847',
    department: '회계팀',
    position: '사원',
    status: { color: 'green', title: '근무중' },
  },
  {
    name: '이채영',
    id: '19293847',
    department: '회계팀',
    position: '사원',
    status: { color: 'purple', title: '근무중' },
  },
];

const employees = rawEmployeeData.map(function (rawEmployee) {
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

const listLength = 8;
const initialIndex = 1;
const totalIndex = Math.ceil(employees.length / listLength);
let currentIndex = initialIndex;

//함수 재호출 트리거 함수
const triggerRender = function (content) {
  // employeeList(content);
};

export const employeeList = function (content) {
  console.log('run page render'); // 함수 재호출 트리거 함수를 비활성화했는데 왜 페이지가 재호출 되는것인지?
  const paginationBtnsRender = function () {
    console.log('run btn render');
    const paginationBtnList = [];
    for (let i = 1; i <= totalIndex; i++) {
      paginationBtnList[i] = `<a href="#" id="${'pageBtn' + i}" class="${
        i == currentIndex ? 'active' : ''
      }">${i}</a>`;
    }
    return paginationBtnList.join('');
  };

  const paginationBtnsAddEvent = function () {
    const btnObjects = [];
    for (let i = 1; i <= totalIndex; i++) {
      btnObjects[i] = document.querySelector(`#pageBtn${i}`);
      btnObjects[i].addEventListener('click', function () {
        currentIndex = i;
        triggerRender(content); // 상태값이 변경되었으므로 페이지 렌더 함수를 재호출
      });
    }
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
            ${employees.slice(currentIndex, currentIndex + 8).join('')}
          </tbody>
        </table>
      </section>

      <section class="pagination">
        <a href="#" class="pagination--prev">prev</a>
        <!--
        <a href="#" class="active">
          1
        </a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">7</a>
        <a href="#">8</a>
        -->
        ${paginationBtns}
        <a href="#" class="pagination--next">next</a>
      </section>
    </div>
    `;
  paginationBtnsAddEvent();
};
