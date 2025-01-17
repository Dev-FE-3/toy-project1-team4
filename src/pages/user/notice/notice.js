import './notice.css';

export const notice = function (content) {

  content.innerHTML = `
    <ul id="notice" class="row">
      <li class= "card col-4 ">
        <a href="#">
          <div class="image-container">
            <div src="./../public/images/img_IT.png" alt="게시글 이미지" class="card__img" /> 
          </div> 
          <div class="">
            <h4 class="">[신규 프로젝트 런칭 안내: Project Phoenix]</h4>
            <p class="card__content">
              본사에서 신규 프로젝트인 "Project Phoenix"를 다음 달부터 진행합니다. 참여 희망자는 개발팀 김민재 팀장에게 문의주세요
            </p>
          </div>
          <div class="card__author">
            <img src="./../public/images/img_men.png" class="author-img" />
            <div class="">
              <div class="author-content">
                <span class="author__position">백그라운드개발드림팀</span>
                <span class="author__name">김수완</span>
              </div>
              <time>
                2025-01-14
              </time>
            </div>
          </div>
        </a>
      </li>
    </ul>
  `;
}