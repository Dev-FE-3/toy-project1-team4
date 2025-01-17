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
export async function poolDb(query, params = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.query('SELECT 1 FROM DUAL', params);
    console.log('result ---> ' + JSON.stringify(result))
    return result;
  } finally {
    if (connection) connection.release();
  }
}

// 로그인 체크
export async function checkLogin(query, params = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    const result = await connection.query('SELECT * FROM USER', params);
    console.log('result ---> ' + JSON.stringify(result))
    return result;
  } finally {
    if (connection) connection.release();
  }
}