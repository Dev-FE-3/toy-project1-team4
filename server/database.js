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


export async function connectDb() {
  let connection;
  try {
    // 연결 획득
    connection = await pool.getConnection();
    console.log('connection: ' + connection);
    return connection;
  } catch (err) {
    console.error(err);
    throw err;
  }
}