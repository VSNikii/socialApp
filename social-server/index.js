require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;
const transporter = nodemailer.createTransport({
    service: 'mail.ru',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Разрешаем запросы и учим сервер понимать JSON
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('error', (err, client) => {
    console.error('Непредвиденная ошибка в неактивном клиенте PostgreSQL:', err);
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




app.post('/auth', async (req, res) => {
    try {
        const { email, password, fullName } = req.body;

        if (!email || !password || !fullName) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }
        const saltRounds = 10;

        const hashedPasswords = await bcrypt.hash(password, saltRounds);
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        const values = [email, hashedPasswords, fullName, verificationCode]
        const query = `INSERT INTO verification_codes (email, password, name, code) 
    VALUES ($1, $2, $3, $4)`;
        const result = await pool.query(query, values);
        const resultSendMail = await transporter.sendMail({
            from: `"Приложение Искра" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Код подтверждение регистрации',
            text: `Привет, ${fullName}! Твой код подтверждения для приложения Искра: ${verificationCode}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Добро пожаловать в «Искру»! 🔥</h2>
                    <p>Твой код подтверждения регистрации:</p>
                    <h1 style="color: #4F46E5; letter-spacing: 2px;">${verificationCode}</h1>
                    <p>Код действителен в течение короткого времени.</p>
                </div>
            `,
        })
        return res.status(200).json({
            success: true,
            message: 'Код верификации создан',
        });


    } catch (err) {
        console.error('Error from post auth: ' + err.message);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }



})

module.exports = pool;


// Запускаем сервер
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});