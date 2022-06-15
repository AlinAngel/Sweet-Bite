const Router = require("express");
const { body } = require("express-validator");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/role", userController.addRole); // создание роли
router.get("/confectioner/:id", userController.getOneConfectioner); // получение кондитера (портфолио)
router.get("/confectioners", userController.getAllConfectioners); // получение всех кондитеров
router.get("/profile", authMiddleware, userController.getProfile); // получение информации для личного кабинета
router.put("/profile/avatar", authMiddleware, userController.updateAvatar); // обновление аватара
router.put("/profile/", authMiddleware, userController.updateUser); // обновление профиля
router.post(
  "/registration",
  body("email").isEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Пароль должен быть не менее 8 символов"),
  userController.registration
); // регистрация
router.post("/confectioner", authMiddleware, userController.becomeConfectioner); // стать кондитером
router.post(
  "/registration/confectioner",
  userController.confectionerRegistration
); // регистрация кондитера
router.post("/login", userController.login); // авторизация
router.get("/auth", authMiddleware, userController.check); // проверка: авторизован пользователь или нет

module.exports = router;
