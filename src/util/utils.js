/*
* 로그인 세션 or 토큰 상태 확인
* 유효성 검사
* 정규표현식
* 숫자 콤마 
* 전화번호 포맷
* 랜덤 생성 함수
* 등등
*/

export { formatDateTime, approveStatusStyle }

//날짜 포멧 함수
function formatDateTime(isoString) {
  // ISO 날짜 문자열을 JavaScript Date 객체로 변환
  const date = new Date(isoString);
  
  // 연도, 월, 일 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  // 시각 추출
  // const hours = String(date.getHours()).padStart(2, '0');
  // const minutes = String(date.getMinutes()).padStart(2, '0');
  
  // 원하는 형식으로 반환
  // return `${year}-${month}-${day} ${hours}:${minutes}`;
  return `${year}-${month}-${day}`;
}


//결제 버튼 css style class
function approveStatusStyle (str) {
  switch (str) {
    case '결제 중':
      str = 'label--purple';
      break;
    case '결제 완료':
      str = 'label--green';
      break;
    case '반려됨':
      str = 'label--red';
      break;
  }
  return str;
}