const Router = require("express");
const router = new Router();
const socialMediaTypeController = require("../controllers/socialMediaTypeController");

router.post("/", socialMediaTypeController.create); // создание типа соц.сети
router.get("/", socialMediaTypeController.getAll);

module.exports = router;
