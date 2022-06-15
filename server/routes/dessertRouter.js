const Router = require("express");
const router = new Router();
const dessertController = require("../controllers/dessertController");
const authMiddleware = require("../middleware/authMiddleware");

router.delete(
  "/delete/:dessertId",
  authMiddleware,
  dessertController.deleteDessert
); // удаление десерта
router.put("/edit", authMiddleware, dessertController.edit); // создание десерта
router.post("/", authMiddleware, dessertController.create); // создание десерта
router.get("/myDesserts", authMiddleware, dessertController.getMyDesserts); // получение десертов конкретного кондитера
router.get("/favourite", authMiddleware, dessertController.getFavourite); // получение избранного
router.get("/", dessertController.getAll); // получение всех десертов
router.get("/:id", dessertController.getOne); // получение конкретного десерта
router.post("/review", authMiddleware, dessertController.postReview); // добавление отзыва
router.post(
  "/favourite",
  authMiddleware,
  dessertController.addOrDeleteFavourite
); // добавление/удаление избранного

module.exports = router;
