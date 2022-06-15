const ApiError = require("../error/apiError");

// по сути функция и есть middleware
// err - error,
// req - request,   res - result,
// next - ф-ция, вызвав которую мы передадим управление следующему в цепочке middleware
module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    // если класс ошибки - это ApiError
    // возвращаем на клиент ответ со статус-кодом, который будем получать из ошибки
    return res.status(err.status).json({ message: err.message });
  }
  console.log(err.message);
  return res.status(500).json({ message: "Непредвиденная ошибка!" });
};
