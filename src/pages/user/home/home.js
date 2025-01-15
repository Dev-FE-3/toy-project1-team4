import './home.css';

export const home = function (content) {

  content.innerHTML = `
    <div id="home" class="row">
      <section class="section section--user col-4">
        <div class="section__bottom">
          내용
        </div>
      </section>
      <section class="section section--graph col-5">
        <div class="section__top">
          <h5 class="section__title">이번주 근무 시간</h5>
          <a href="#" class="section__more">더보기</a>
        </div>
        <div class="section__bottom">
          내용
        </div>
      </section>
      <section class="section section--time col-3">
        <div class="section__top">
          <h5 class="section__title">남은 근무시간</h5>
          <a href="#" class="section__more">더보기</a>
        </div>
        <div class="section__bottom">
          내용
        </div>
      </section>
      <section class="section section--work col-5">
        <div class="section__top">
          <h5 class="section__title">근태 신청 현황</h5>
          <a href="#" class="section__more">더보기</a>
        </div>
        <div class="section__bottom">
          내용
        </div>
      </section>
      <section class="section section--notice col-4">
        <div class="section__top">
          <h5 class="section__title">사내 공지</h5>
          <a href="#" class="section__more">더보기</a>
        </div>
        <div class="section__bottom">
          내용
        </div>
      </section>
      <section class="section section--meeting col-3">
        <div class="section__top">
          <h5 class="section__title">1월 10일</h5>
          <a href="#" class="section__more">더보기</a>
        </div>
        <div class="section__bottom">
          내용
        </div>
      </section>
    </div>
  `;
}