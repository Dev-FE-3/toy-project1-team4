# TEAM1 - 빵긋

> 데브캠프 3기 토이 프로젝트 1 - TEAM 4에서 진행한 프로젝트입니다.

## 1. 팀원 소개

| [![@jungu0416](https://avatars.githubusercontent.com/u/88638457?v=4)](https://github.com/jungu0416) | [![@minsung521](https://avatars.githubusercontent.com/u/37471565?v=4)](https://github.com/minsung521) | [![@pha1155](https://avatars.githubusercontent.com/u/38741900?v=4)](https://github.com/pha1155) | [![@girl0330](https://avatars.githubusercontent.com/u/150775699?v=4)](https://github.com/girl0330) |
| :-------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
|                      **강준구**<br/>[@jungu0416](https://github.com/jungu0416)                      |                      **김민성**<br/>[@minsung521](https://github.com/minsung521)                      |                      **박현아**<br/>[@pha1155](https://github.com/pha1155)                      |                      **표현경**<br/>[@girl0330](https://github.com/girl0330)                       |
|                                  API/DB 구현 </br >근태 관리 구현                                   |                                  UI 디자인 </br> 직원 목록/상세 구현                                  |                            공통 컴포넌트 설계 <br/> 홈 대시보드 구현                            |                                        공지사항 갤러리 구현                                        |

<br/>

## 2. 프로젝트 소개

`TEAM1 - 빵긋` 프로젝트는 사내 **인사관리 솔루션**을 목적으로 진행하는 토이 프로젝트입니다.  
직원 정보, 근태 관리, 공지사항, 팀 소통 등을 한 곳에서 처리할 수 있도록 기획하고 있으며,  
프론트엔드와 백엔드로 역할을 분담해 협업하고 있습니다.

<!-- 프로젝트 대표 타이틀, 목업 담긴 이미지  -->

<br/>

## 3. 설치 및 실행 방법

### 3.1 설치

```bash
npm install
```

### 3.2 서버 실행

```bash
npm run server
```

### 3.3 클라이언트 실행

```bash
npm run dev
```

<br/>

## 4. 프로젝트 구조

```bash
.
├─ public
├─ server
│  └─ ...
├─ src
│  ├─ components
│  ├─ pages
│  ├─ router
│  ├─ style
│  ├─ utils
│  └─ main.js
├─ package.json
├─ README.md
└─ ...
```

- **public** : 이미지, 폰트 등 정적 파일
- **server** : Node.js 기반 서버 (Express)
- **src** : 프론트엔드 핵심 소스
  - **components** : 재사용 가능한 컴포넌트
  - **pages** : 페이지 단위 화면
  - **router** : SPA 페이지 라우팅 코드
  - **styles** : 공통 CSS, reset 파일
  - **util** : 유틸 함수 모음
  - **main.js** : 애플리케이션 진입점
- **package.json** : 의존성 및 스크립트

<br/>

## 5. 주요 기능

1. **직원 관리**

   - 신규 등록 / 정보 수정 / 직원 목록 조회
   - 부서, 직급별 필터링 및 검색

2. **근태 관리**

   - 출근 / 퇴근, 외출 / 복귀 신청
   - 휴가(연차, 반차, 병가 등) 신청 및 승인 절차

3. **공지사항**
   - 작성 / 수정 / 삭제, 댓글 기능
   - 페이지네이션, 검색 기능

<!-- 주요 기능에 대한 간단한 작동 화면 이미지를 삽입 -->

<br/>

## 6. 개발 환경

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
</p>

<br/>

## 7. 협업 방식

- **브랜치 전략** : `main`, `develop`, `feature/기능명`

  - `main` : 배포 브랜치
  - `dev` : 테스트 및 통합 브랜치
  - `feature` : 각 기능 단위 개발

- **이슈 & PR 기반** : GitHub Issue 생성 → 작업 → PR → 코드 리뷰 & Merge
- **커뮤니케이션** : Slack, Notion 사용
  - 일일 스크럼 진행, 회의록 및 기능명세는 Notion에 기록
- **피그마** : UI/UX 디자인 협업 도구

<!-- 필요 시 "노션, 슬랙, 피그마" 협업 화면 캡처 이미지를 삽입하면 됩니다. -->

<br/>

## 8. 페이지별 상세 기능

### 8.1 홈(대시보드)

- 개인 정보 표시 (프로필, 이름, 부서, 직급 등)
- 실시간 근무 시간(출근/퇴근 체크)
- 휴가·외출 신청 이력과 요약 표시

### 8.2 직원 프로필 상세 / 목록

- 프로필 사진 등록·수정·삭제
- 직원 정보 (이메일, 연락처, 입사일 등) 확인
- **목록 페이지**에서 검색, 필터링, 페이지네이션

### 8.3 근태 신청 페이지

- 휴가(연차, 반차, 조퇴 등) 신청 기능
- 휴가(연차, 반차, 병가 등) 신청, 승인 절차 목록 조회 가능

### 8.4 공지사항 페이지

- 작성 / 수정 / 삭제 / 댓글 기능
- 페이지네이션, 검색 기능

<br/>

## 9. KPT 회고

- **Keep**
  - 데일리 스크럼으로 소통 원활
  - Git Flow로 안정적인 버전 관리
- **Problem**
  - 중복 코드 발생, 컴포넌트화 부족
  - 컨벤션 미준수 사례로 인한 혼선
- **Try**
  - 리팩토링 일정 별도 확보
  - 코드 리뷰 프로세스 강화
  - 컨벤션 문서화 및 지속 확인

<br/>

> **문의 사항**  
> 프로젝트 관련 문의나 버그 제보는 [Issues](https://github.com/Dev-FE-3/toy-project1-team4/issues)에 남겨주세요!  
> 빵긋 팀이 신속히 대응하겠습니다 :)
