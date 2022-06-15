// Здесь будем декодировать токен и проверять его на валидность
// Если токен невалидный, то будем возвращать ошибку о том, что пользователь не авторизован
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // если метод = options, то пропускаем
  // нас интересуют только POST, GET, PUT, DELETE
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    // поскольку токен помещают в хедер authorization, то нам нужно его достать
    // в хедер обычно помещают сначала тип токена, а потом сам токен: Bearer asdfdghkdjfsl
    // поэтому по пробелу нужно отделить два этих слова и по 1-му индексу получить сам токен
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Токен не существует" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Пользователь не авторизован" });
  }
};
