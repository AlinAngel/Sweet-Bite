const uuid = require("uuid");
const path = require("path");
const sequelize = require("../db");
const {
  Dessert,
  DessertInfo,
  Type,
  User,
  Review,
  FavouriteDessert,
  DessertImage,
  ConfectionerInfo,
} = require("../models/models");
const ApiError = require("../error/apiError");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const getRaiting = (desserts, allReviewsNumber, isFav) => {
  const returnDesserts = desserts.rows.map((item) => {
    const dessert = isFav ? item.dessert : item;
    const reviewsNumber = dessert.reviews.length;
    let rating;
    if (reviewsNumber > 0) {
      const sum = dessert.reviews.reduce(
        (initial, current) => initial + current.rating,
        0
      );
      const avg = sum / reviewsNumber;

      rating = +(
        (reviewsNumber * avg) / (reviewsNumber + 1) +
        (1 * allReviewsNumber) / (reviewsNumber + 1)
      ).toFixed(2);
    } else {
      rating = 0;
    }

    return { ...dessert, rating };
  });
  return returnDesserts;
};

class DessertController {
  async create(req, res, next) {
    try {
      let {
        name,
        price,
        description,
        ingredients,
        storageTemp,
        pricePer,
        shelfLife,
        typeId,
      } = req.body;

      let imgs = req.files?.imgs || [];
      const { id } = req.user;

      if (
        !name ||
        !price ||
        !req.files?.imgs ||
        !description ||
        !pricePer ||
        !typeId
      ) {
        return next(ApiError.badRequest("Данные введены некорректно"));
      }
      if (!Array.isArray(imgs)) {
        imgs = [imgs];
      }

      const dessertInfo = await DessertInfo.create({
        name,
        pricePer,
        price,
        description,
        ingredients,
        storageTemp,
        shelfLife,
      });

      let images = [];
      imgs.forEach((image) => {
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, "..", "static", fileName)); // перемещение файла в папку static
        images.push(fileName);
      });

      if (images) {
        images.forEach((img) => {
          DessertImage.create({ img, dessertInfoId: dessertInfo.id });
        });
      }

      const dessert = await Dessert.create({
        userId: id,
        typeId,
        dessertInfoId: dessertInfo.id,
      });

      return res.json(dessert);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async edit(req, res, next) {
    try {
      let {
        name,
        price,
        description,
        ingredients,
        storageTemp,
        shelfLife,
        pricePer,
        typeId,
        oldImages,
        dessertId,
      } = req.body;

      if (
        !name ||
        !price ||
        (!req.files?.imgs && !oldImages.length) ||
        !description ||
        !storageTemp ||
        !typeId
      ) {
        return next(ApiError.badRequest("Данные введены некорректно"));
      }
      let imgs = req.files?.imgs || [];
      if (!Array.isArray(imgs)) {
        imgs = [imgs];
      }
      const dessert = await Dessert.findByPk(dessertId);

      await dessert.update({
        typeId,
      });

      const dessertInfo = await DessertInfo.findByPk(dessert.dessertInfoId);
      await dessertInfo.update({
        name,
        price,
        pricePer,
        description,
        ingredients,
        storageTemp,
        shelfLife,
      });

      const allImages = await DessertImage.findAll({
        where: {
          dessertInfoId: dessertInfo.id,
        },
      });

      if (allImages) {
        allImages.forEach(async (img) => {
          if (!oldImages.includes(img.img)) {
            await img.destroy();
          }
        });
      }

      let newImages = [];
      imgs?.forEach((image) => {
        let fileName = uuid.v4() + ".jpg";
        image.mv(path.resolve(__dirname, "..", "static", fileName)); // перемещение файла в папку static
        newImages.push(fileName);
      });

      if (newImages.length) {
        newImages.forEach((img) => {
          DessertImage.create({ img, dessertInfoId: dessertInfo.id });
        });
      }
      return res.json(dessert);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    try {
      let { typeId, limit, page, direction, column, searchQuery, city } =
        req.query;
      page = page || 1; // текущая страница или 1-я по умолчанию
      limit = limit || 9; // если лимит не указан, то по 9 десертов на странице
      let offset = page * limit - limit; // отступ (сколько десертов нужно пропустить)
      let desserts, decoded;
      const token = req.headers.authorization.split(" ")[1];
      console.log(city);
      if (token && token !== "null") {
        decoded = jwt.verify(token, process.env.SECRET_KEY);
      }

      let order;
      switch (column) {
        case "createdAt":
          order = [["createdAt", direction]];
          break;
        case "price":
          order = [[DessertInfo, "price", direction]];
          break;
        default:
          order = [];
          break;
      }

      // получение всех десертов
      if (!typeId && !searchQuery) {
        desserts = await Dessert.findAndCountAll({
          distinct: true,
          include: [
            {
              model: Review,
            },
            {
              model: User,
              include: [{ model: ConfectionerInfo, where: { city } }],
              required: true,
            },
            {
              model: FavouriteDessert,
              where: { userId: decoded?.id || null },
              required: false,
            },
            {
              model: DessertInfo,
              include: [
                {
                  model: DessertImage,
                },
              ],
            },
          ],
          order,
        });
      }

      // поиск и фильтрация по типу одновременно
      if (typeId && searchQuery) {
        desserts = await Dessert.findAndCountAll({
          where: { typeId },
          distinct: true,
          include: [
            {
              model: Review,
            },
            {
              model: User,
              include: [{ model: ConfectionerInfo, where: { city } }],
              required: true,
            },
            {
              model: FavouriteDessert,
              where: { userId: decoded?.id || null },
              required: false,
            },
            {
              model: DessertInfo,
              where: {
                name: { [Op.iLike]: "%" + searchQuery + "%" },
              },
              include: [
                {
                  model: DessertImage,
                },
              ],
            },
          ],
          order,
        });
      }

      // фильтрация по типу
      if (typeId && !searchQuery) {
        desserts = await Dessert.findAndCountAll({
          where: { typeId },
          distinct: true,
          include: [
            {
              model: Review,
            },
            {
              model: User,
              include: [{ model: ConfectionerInfo, where: { city } }],
              required: true,
            },
            {
              model: FavouriteDessert,
              where: { userId: decoded?.id || null },
              required: false,
            },
            {
              model: DessertInfo,
              include: [
                {
                  model: DessertImage,
                },
              ],
            },
          ],
          order,
        });
      }

      // поиск
      if (!typeId && searchQuery) {
        desserts = await Dessert.findAndCountAll({
          include: [
            {
              model: Review,
            },
            {
              model: User,
              include: [{ model: ConfectionerInfo, where: { city } }],
              required: true,
            },
            {
              model: FavouriteDessert,
              where: { userId: decoded?.id || null },
              required: false,
            },
            {
              model: DessertInfo,
              where: {
                name: { [Op.iLike]: "%" + searchQuery + "%" },
              },
              include: [
                {
                  model: DessertImage,
                },
              ],
            },
          ],
          order,
        });
      }

      const dessertWithRaiting = desserts.rows.map((dessert) => {
        let ratingNumber = dessert.reviews.length;
        let totalRating = 0;
        dessert.reviews.forEach((review) => {
          totalRating += review.rating;
        });

        const rating = ratingNumber
          ? +(totalRating / ratingNumber).toFixed(2)
          : 0;
        return { ...dessert.dataValues, rating: rating };
      });

      if (column === "popular") {
        dessertWithRaiting.sort((a, b) => {
          if (direction === "DESC") {
            return a.rating - b.rating;
          } else {
            return b.rating - a.rating;
          }
        });
      }

      return res.json({
        rows: dessertWithRaiting.slice(offset, offset + limit),
        count: desserts.count,
      });
    } catch (e) {
      console.log(e);
    }
  }

  // оставить отзыв
  async postReview(req, res, next) {
    try {
      const { dessertId, rating, review } = req.body;
      const { id } = req.user;

      // проверяем, оставлял ли пользователь отзыв на данный десерт
      const reviewCheck = await Review.findOne({
        where: { userId: id, dessertId },
      });

      if (reviewCheck) {
        return next(
          ApiError.forbidden("Вы уже оставили отзыв данному дессерту")
        );
      }

      const newReview = await Review.create({
        userId: id,
        dessertId,
        rating,
        review,
      });
      return res.json(newReview);
    } catch (e) {
      return next(ApiError.badRequest("Что-то пошло не так"));
    }
  }

  // получение конкретного десерта
  async getOne(req, res) {
    const { id } = req.params;
    let desserts, decoded;
    const token = req.headers.authorization.split(" ")[1];

    if (token && token !== "null") {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    }
    const dessert = await Dessert.findOne({
      where: { id },
      order: [[{ model: Review }, "createdAt", "desc"]],
      include: [
        {
          model: Review,
          include: [{ model: User, attributes: ["id", "name", "img"], }],
        },
        {
          model: FavouriteDessert,
          where: { userId: decoded?.id || null },
          required: false,
        },
        {
          model: DessertInfo,
          include: [
            {
              model: DessertImage,
            },
          ],
        },
        { model: Type },
        {
          model: User,
          include: [
            {
              model: ConfectionerInfo,
            },
          ],
        },
      ],
    });
    return res.json(dessert);
  }

  // получение десертов конкретного кондитера (для раздела "мои десерты")
  async getMyDesserts(req, res, next) {
    try {
      const { id } = req.user;
      let { limit, page } = req.query;
      page = page || 1; // текущая страница или 1-я по умолчанию
      limit = limit || 9; // если лимит не указан, то по 9 десертов на странице
      let offset = page * limit - limit; // отступ (сколько десертов нужно пропустить)

      let myDesserts = await Dessert.findAndCountAll({
        where: { userId: id },
        limit,
        offset,
        distinct: true,
        include: [
          {
            model: Review,
          },
          {
            model: DessertInfo,
            include: [
              {
                model: DessertImage,
              },
            ],
          },
        ],
      });

      return res.json(myDesserts);
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  // избранное (добавление/удаление)
  async addOrDeleteFavourite(req, res, next) {
    try {
      const { dessertId } = req.body;
      const { id } = req.user;

      // проверяем, есть ли уже десерт в избранном
      const isFavorite = await FavouriteDessert.findOne({
        where: { userId: id, dessertId },
      });

      if (!isFavorite) {
        const favorite = await FavouriteDessert.create({
          userId: id,
          dessertId,
        });
        return res.json(favorite);
      } else {
        FavouriteDessert.destroy({ where: { userId: id, dessertId } });
        return res.json(`Десерт ${dessertId} удален`);
      }
    } catch (e) {
      return next(ApiError.badRequest(e.message));
    }
  }

  // получение избранных
  async getFavourite(req, res, next) {
    try {
      const { id } = req.user;
      const { limit, offset, typeId } = req.query;
      let favorites;
      if (!typeId) {
        favorites = await FavouriteDessert.findAndCountAll({
          where: { userId: id },
          distinct: true,
          include: [
            {
              model: Dessert,
              include: [
                {
                  model: DessertInfo,
                  include: [
                    {
                      model: DessertImage,
                    },
                  ],
                },
                { model: Review },
              ],
            },
          ],
          limit,
          offset,
        });
      } else {
        favorites = await FavouriteDessert.findAndCountAll({
          where: { userId: id },
          distinct: true,
          include: [
            {
              model: Dessert,
              where: { typeId },
              include: [
                {
                  model: DessertInfo,
                  include: [
                    {
                      model: DessertImage,
                    },
                  ],
                },
                { model: Review },
              ],
            },
          ],
          limit,
          offset,
        });
      }

      const reviewsNumber = await Review.count({ where: { userId: id } });
      favorites = JSON.parse(JSON.stringify(favorites));

      // favorites.rows.forEach((dessert) => {
      //   console.log(dessert);
      //   dessert.favourite_desserts.filter((fav) => {
      //     return fav.userId === decoded.id;
      //   });
      // });

      let favoritesWithRaiting = getRaiting(favorites, reviewsNumber, true);
      return res.json(favoritesWithRaiting);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
  }

  async deleteDessert(req, res, next) {
    try {
      const { dessertId } = req.params;
      const { id } = req.user;

      const deletedDessert = await Dessert.destroy({
        where: { id: dessertId, userId: id },
      });

      return res.json(deletedDessert);
    } catch (err) {
      return next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new DessertController();
