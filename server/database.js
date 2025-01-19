import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

// MariaDB 연결 풀 생성
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  connectionLimit: 100,
});

// DB 연결 테스트
export async function poolDb() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('MariaDB에 성공적으로 연결되었습니다.');
    return connection;
  } catch {
    console.error('MariaDB 연결 실패:', err);
    throw err;
  }
}