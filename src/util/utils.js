/*
 * 로그인 세션 or 토큰 상태 확인
 * 유효성 검사
 * 정규표현식
 * 숫자 콤마
 * 전화번호 포맷
 * 랜덤 생성 함수
 * 등등
 */
import axios from 'axios';

// 데이터 타입 확인
function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

// 날짜 포멧 함수
function formatDateTime(isoString, mode = 'date') {
  // ISO 날짜 문자열을 JavaScript Date 객체로 변환
  const date = new Date(isoString);

  // 연도, 월, 일 추출
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // 시각 추출
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // 원하는 형식으로 반환
  if (mode === 'time') {
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  return `${year}-${month}-${day}`;
}

// 결제 버튼 css style class
function buttonStatusStyle(page, status) {
  const styles = {
    approve: {
      '결제 중': 'label--purple',
      '결제 완료': 'label--green',
      반려됨: 'label--red',
    },
    work: {
      자리비움: 'label--purple',
      근무중: 'label--green',
      결근: 'label--red',
    },
  };
  return styles[page][status];
}

// 현재 시각 타이머
function timerFunc(item) {
  const updateTime = () => {
    let date = new Date();
    const pad = (num) => String(num).padStart(2, '0');
    const hours = pad(date.getMinutes());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    item.innerHTML = `${hours}:${minutes}:${seconds}`;
  };

  updateTime();
  setInterval(updateTime, 1000);
}

async function fetchData(method, url, data = {}) {
  try {
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { getType, formatDateTime, buttonStatusStyle, timerFunc, fetchData };
