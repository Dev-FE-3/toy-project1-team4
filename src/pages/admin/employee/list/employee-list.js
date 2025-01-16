import './employee-list.css';

// const renderList = function (list) {}

export const employeeList = function (content) {
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
            <tr>
              <td class="table__name">송하영</td>
              <td class="table__id">12345678</td>
              <td class="table__department">인사팀</td>
              <td class="table__position">대리</td>
              <td class="table__status">
                <span class="label label--red ">
                  결근
                </span>
              </td>
            </tr>
            <tr>
              <td>내용1</td>
              <td>내용2</td>
              <td>내용3</td>
              <td>내용3</td>
              <td>
                <span class="label label--orange">휴가</span>
              </td>
            </tr>
            <tr>
              <td>내용1</td>
              <td>내용2</td>
              <td>내용3</td>
              <td>내용3</td>
              <td>
                <span class="label label--green">근무중</span>
              </td>
            </tr>
            <tr>
              <td>내용1</td>
              <td>내용2</td>
              <td>내용3</td>
              <td>내용3</td>
              <td>
                <span class="label label--purple">자리비움</span>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="pagination">
        <a href="#" class="pagination--prev">
          prev
        </a>
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
        <a href="#" class="pagination--next">
          next
        </a>
      </section>
    </div>
    `;
};
