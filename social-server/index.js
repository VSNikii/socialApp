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

async function run(){
    try{
        await pool.connect();
        console.log('Connected');
        
        
    }
    catch(err){
        console.error('Error from run ' + err);
    }
}

run();



// 1. Эндпоинт для получения всех постов (GET)
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        return res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера при получении постов' });
    }
});


module.exports = pool;

// 2. Эндпоинт для создания нового поста (POST)
// app.post('/posts', async (req, res) => {
//     try {
//         const { text } = req.body;
//         if (!text) {
//             return res.status(400).json({ error: 'Текст поста не может быть пустым' });
//         }

//         const queryText = 'INSERT INTO posts(content) VALUES($1) RETURNING *';
//         const result = await client.query(queryText, [text]);
        
//         res.status(201).json(result.rows[0]); // Возвращаем созданный пост клиенту
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Ошибка сервера при сохранении поста' });
//     }
// });

// Запускаем сервер
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});