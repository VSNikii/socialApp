require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Разрешаем запросы и учим сервер понимать JSON
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});



// Настройки подключения к твоей локальной базе данных

// Подключаемся к базе при старте сервера

async function run() {
    try {
        await pool.connect();
        console.log('Connected');


    }
    catch (err) {
        console.error('Error from run ' + err);
    }
}

run();



// 1. Эндпоинт для получения всех постов (GET)
// app.get('/', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM posts');
//         return res.json(result.rows);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Ошибка сервера при получении постов' });
//     }
// });


module.exports = pool;

// 2. Эндпоинт для создания нового поста (POST)
app.post('/posts', async (req, res) => {
    console.log('--- ПОЛУЧЕНЫ ДАННЫЕ С МОБИЛКИ ---');
    console.log(req.body); // Печатаем всё, что прислал клиент
    console.log('--------------------------------');

    return res.status(200).json({
        message: 'Пост успешно получен сервером!',
        receivedData: req.body
    });
});
// Запускаем сервер
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});