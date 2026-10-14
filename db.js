require('dotenv').config();
const { Client } = require('pg');
const FileSystem = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


export const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

export async function getData() {
    try {
        const postsData = await client.query('SELECT * FROM posts');
        console.log(postsData.rows);
        return postsData;
    }
    catch (err) {
        console.error('Error from getData', err);

    }
}

    async function setData(nickname = 'user') {
    try {
        const username = nickname;
        const postId = uuidv4();
        const text = await setText();
        
        const {pathImg, imgId} = await setImage();

        // console.log(text, pathImg, imgId);


        await client.query('INSERT INTO posts (username, id, des, file_path, imageId) VALUES ($1, $2, $3, $4, $5)', 
            [username, postId, text, pathImg, imgId])
        
    }
    catch (err) {
        console.error('Error from setData', err);
    }
}

async function setText() {
    try {
        const responseTxt = await fetch('https://fish-text.ru/get?type=sentence&format=json', {
            method: 'GET'
        });
        const text = await responseTxt.json();
        
        // await client.query('INSERT INTO posts (des) VALUES ($1)', [text.text])
        // console.log(text);
        // console.log(responseTxt.status);
        return text.text;
    }
    catch (err) {
        console.error("Error from setText: ", err);

    }
    
}

async function setImage() {
    try {
        const responseImg = await fetch('https://api.api-ninjas.com/v1/randomimage', {
            method: 'GET',
            headers: {
                'X-API-KEY': 'flw6wPyAPewj42lInpc38JLsVHVufcAw6XVVpveJ',
                'Accept': 'image/jpg'
            }
        });
        let imgId = uuidv4();
        const img = await responseImg.arrayBuffer();
        const nodeImg = Buffer.from(img);
        const pathImg = path.join(__dirname, '/images/', `image${imgId}.jpg`)
        FileSystem.writeFileSync(pathImg, nodeImg)

        return {pathImg, imgId};
        // потом намеренно попробовать сделать sql-иньекцию и взломать через нее
        // await client.query('INSERT INTO posts (file_path, imageid) VALUES ($1, $2)', [pathImg, imgId]);
        // console.log(response.status);
    }
    catch (err) {
        console.error("Error from setImage", err);
    }
}

export async function run(clientCustom) {
    try {
        await clientCustom.connect()
        console.log("Подключено");
        // await setData('madman');
        // getData();
    }
    catch (err) {
        console.error("Error from run: ", err.message);
    }

}


// console.log('Привет! Скрипт запустился!');

// const { Client } = require('pg');
// console.log('Модуль pg успешно подгрузился через require!');

// client.connect()
//     .then(() => console.log('Подключились!'))
//     .catch(() => console.error('Ошибка: ', err.message));