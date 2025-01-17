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


// DB connection Check!!
poolDb();

app.get('/api/login', (req, res) => {
  
})

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
