import express from 'express'
import morgan from 'morgan'
import fs from 'fs'
import { poolDb } from './database.js';

const THRESHOLD = 2000
const port = process.env.PORT || 5174
const app = express()

app.use((req, res, next) => {
  const delayTime = Math.floor(Math.random() * THRESHOLD)

  setTimeout(() => {
    next();
  }, delayTime);
})

app.use(morgan('dev'))
app.use(express.static('dist'))
app.use(express.json())

// 로그인 체크
app.post('/api/login', async (req, res) => {
  const { id } = req.body;

  const query = 'SELECT * FROM USERS where id = ?';
  try {
    const conn = await poolDb();
    const rows = await conn.query(query, [id]);
    res.send(rows);
    conn.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('사용자 조회 중 오류가 발생했습니다.');
  }
})

// 본인 정보 가져오기
app.get('/api/user/:num', async (req, res) => {
  const { num } = req.params;

  const query = 'SELECT * FROM USERS where num = ?';
  try {
    const conn = await poolDb();
    const rows = await conn.query(query, [ num ]);
    res.send(rows);
    conn.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('사용자 조회 중 오류가 발생했습니다.');
  }
})

// 모든 User 정보 가져오기
app.get('/api/users', async (req, res) => {

  const query = 'SELECT * FROM USERS';
  try {
    const conn = await poolDb();
    const rows = await conn.query(query);
    res.send(rows);
    conn.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('사용자 조회 중 오류가 발생했습니다.');
  }
})


// 메뉴
app.get('/api/menu/:role', async (req, res) => {
  const { role } = req.params;

  const query = 'SELECT * FROM menu where role = ?';
  try {
    const conn = await poolDb();
    const rows = await conn.query(query,[role]);
    res.send(rows);
    conn.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('메뉴 조회 중 오류가 발생했습니다.');
  }
});

// 공지사항
app.get('/api/notice', async (req, res) => {
  const query = 'SELECT * FROM notice';
  try {
    const conn = await poolDb();
    const rows = await conn.query(query);
    res.send(rows);
    conn.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('공지사항 조회 중 오류가 발생했습니다.');
  }
});


// 미팅
app.post('/api/meet', async (req, res) => {
  const { num } = req.body;

  const query = 'SELECT * FROM meeting where num = ? order by time asc';
  try {
    const conn = await poolDb();
    const rows = await conn.query(query, [num]);
    res.send(rows);
    conn.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('미팅 일정 조회 중 오류가 발생했습니다.');
  }
})

// 근태 갯수
app.post('/api/work', async (req, res) => {
  const { num } = req.body;

  const query = 'SELECT * FROM dayoff where num = ?';
  try {
    const conn = await poolDb();
    const rows = await conn.query(query, [num]);
    res.send(rows);
    conn.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('근태 갯수 중 오류가 발생했습니다.');
  }
})

// 근태 신청 현황
app.post('/api/absence', async (req, res) => {
  const { num } = req.body;

  const query = 'SELECT * FROM approve where num = ? order by start_date desc';
  try {
    const conn = await poolDb();
    const rows = await conn.query(query, [num]);
    res.send(rows);
    conn.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('근태 일정 조회 중 오류가 발생했습니다.');
  }
})

// 근태 신청
app.post('/api/approve', async (req, res) => {
  const { num, type, start_date, end_date, reason, status } = req.body;

  const query = 'insert into approve ( num, type, start_date, end_date, reason, status ) values (?, ?, ?, ?, ?, ?)';
  try {
    const conn = await poolDb();
    const rows = await conn.query(query, [ num, type, start_date, end_date, reason, status ]);

    // BigInt 처리
    const sanitizedRows = JSON.parse(JSON.stringify(rows, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));

    console.log(sanitizedRows);
    res.send(sanitizedRows);
    conn.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('근태 신청 중 오류가 발생했습니다.');
  }
})


// json 파일에서 READ 예제
app.get('/api/users.json', (req, res) => {
  fs.readFile('./server/data/users.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err)
        return res.status(500).send({ 
          status: 'Internal Server Error',
          message: err,
          data: null,
        })
    }

    try {
        const jsonData = JSON.parse(data)
        res.json(jsonData)
    } catch (parseErr) {
        console.error('Error parsing JSON file:', parseErr)
        return res.status(500).send({ 
          status: 'Internal Server Error',
          message: parseErr,
          data: null,
        })
    }
  })
})

app.listen(port, () => {
  console.log(`ready to ${port}`)
})
