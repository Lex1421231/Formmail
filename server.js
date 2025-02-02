const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Указываем папку со статическими файлами
app.use(express.static(path.join(__dirname)));

// Настройка транспорта для отправки email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ac566486@gmail.com', // Ваш Gmail
        pass: 'kbkc kyai ihad yvxu' // Пароль приложения для Gmail
    }
});

// Обработка POST-запроса на отправку email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'ac566486@gmail.com', // Ваш Gmail
        to: 'ac566486@gmail.com', // Email получателя
        subject: 'Новое сообщение от пользователя',
        text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка при отправке email:', error);
            res.status(500).send('Ошибка при отправке email');
        } else {
            console.log('Email отправлен:', info.response);
            res.status(200).send('Сообщение успешно отправлено');
        }
    });
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});