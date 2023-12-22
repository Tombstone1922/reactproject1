const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());


const dbConfig = {
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: '020402',
  port: 5432,
};

const client = new Client(dbConfig);
client.connect();

app.post('http://localhost:8080/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await client.query('INSERT INTO accounts (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    res.json({ success: true, message: 'Регистрация успешна', user: result.rows[0] });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Ошибка при регистрации' });
  }
});

app.post('http://localhost:8080/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await client.query('SELECT * FROM accounts WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Вход успешен', user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Неверные учетные данные' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Ошибка при входе' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
