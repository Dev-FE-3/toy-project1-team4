import './notice.css';

export const notice = function (content) {

  content.innerHTML = `
    <ul id="notice" class="row">
      <li class = "card col-4">
      <div class="image-container">
        <img src="./../public/images/img_IT.png" alt="게시글 이미지" class="card__img" />
      </div> 
      <div>
        <section class="card__title">
          <p>[신규 프로젝트 런칭 안내: Project Phoenix]</p>
        </section>

        <section class="card__content">
          <p>
            본사에서 신규 프로젝트인 "Project Phoenix"를 다음 달부터 진행합니다. 참여 희망자는 개발팀 김민재 팀장에게 문의주세요
          </p>
        </section>
      </div>
      
      <section class="card__author">
        <div class="author-content">
          <img src="./../public/images/img_men.png" />
          <div>
            <div class="author-info">
              <span class="author__position">직책</span>
              <span class="author__name">이름</span>
            </div>

            <time>
              2025-01-14
            </time>
          </div>
        </div>
      </section>
      </li>
      
    </ul>
    
  `;
}