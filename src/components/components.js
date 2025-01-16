// import style from './components.module.css';

export const components = function (content) {
  
  content.innerHTML = `
    <h1>1. box</h1>

    <section class="section">
      <div class="section__top">
        <h5 class="section__title">제목</h5>
        <a href="#" class="section__more">더보기</a>
      </div>
      <div class="section__bottom">
        내용
      </div>
    </section>

    <h1>2. button</h1>

    <button type="button" class="btn btn--primary">버튼명</button>
    <button type="button" class="btn btn--secondary">버튼명</button>

    <h1>3. input</h1>

    <div class="input-wrap">
      <label for="input-01" class="input-label">input title</label>
      <input type="text" class="input-text" id="input-01" placeholder="placeholder">
    </div>

    <div class="input-wrap">
      <label for="textarea-01" class="input-label">input title</label>
      <textarea class="input-text input-text--textarea" id="textarea-01" rows="3"></textarea>
    </div>
    
    <select class="select">
      <option selected>Open menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>

    <h1>4. table</h1>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">제목1</th>
          <th scope="col">제목2</th>
          <th scope="col">제목3</th>
          <th scope="col">제목4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>내용1</td>
          <td>내용2</td>
          <td>내용3</td>
          <td><span class="label label--red">결근</span></td>
        </tr>
        <tr>
          <td>내용1</td>
          <td>내용2</td>
          <td>내용3</td>
          <td><span class="label label--orange">휴가</span></td>
        </tr>
        <tr>
          <td>내용1</td>
          <td>내용2</td>
          <td>내용3</td>
          <td><span class="label label--green">근무중</span></td>
        </tr>
        <tr>
          <td>내용1</td>
          <td>내용2</td>
          <td>내용3</td>
          <td><span class="label label--purple">자리비움</span></td>
        </tr>
      </tbody>
    </table>

    <h1>5. pagination</h1>

    <div class="pagination">
      <a href="#" class="pagination--prev">prev</a>
      <a href="#" class="active">1</a>
      <a href="#">2</a>
      <a href="#">3</a>
      <a href="#">4</a>
      <a href="#">5</a>
      <a href="#">6</a>
      <a href="#">7</a>
      <a href="#">8</a>
      <a href="#" class="pagination--next">next</a>
    </div>
  `;
}