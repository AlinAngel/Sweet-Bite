require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors"); // чтобы отправлять запросы с браузера
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");

const PORT = process.env.PORT || 5000; // получение порта из переменных окружения

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router); // URL, по которому роут должен обрабатываться

// Обработка ошибок
// --- Middleware, который работает с ошибками, идет последним ---
// В нём не вызывается функция next, т.к на нем работа прекращается и мы возвращаем ответ на клиент
app.use(errorHandler);

const start = async () => {
  try {
    // функция для подключения к БД
    await sequelize.authenticate();
    await sequelize.sync(); // будет сверять состояние БД со схемой данных
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
