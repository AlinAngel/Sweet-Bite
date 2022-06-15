const ApiError = require("../error/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const path = require("path");
const {
  User,
  Role,
  ConfectionerInfo,
  SocialMedia,
  Dessert,
  Review,
  Type,
  DessertInfo,
  DessertImage,
  SocialMediaType,
} = require("../models/models");
const { body, validationResult } = require("express-validator");
const { Op } = require("sequelize");

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role }, // payload - объект с данными пользователя
    process.env.SECRET_KEY, // секретный ключ
    { expiresIn: "24h" } // опции; срок окончания действия токена
  );
};

class UserController {
  async addRole(req, res) {
    const { name } = req.body;

    const role = await Role.create({ name });

    return res.json(role);
  }

  // регистрация клиента
  async registration(req, res, next) {
    try {
      const { name, lastName, middleName, email, password } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // проверка на существование пользователя с таким же email в системе
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest("Пользователь с такой эл. почтой уже существует")
        );
      }

      const userRole = await Role.findOne({ where: { name: "USER" } });

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        name,
        lastName,
        middleName,
        email,
        password: hashPassword,
        roleId: userRole.id,
      });

      const token = generateJwt(user.id, user.email, userRole); // генерация токена

      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // регистрация кондитера
  async confectionerRegistration(req, res, next) {
    try {
      const {
        name,
        lastName,
        middleName,
        email,
        password,
        city,
        phone,
        socialMedia,
        isDelivery = false,
        pastryShop = null,
      } = req.body;

      // проверка на существование пользователя с таким же email в системе
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(
          ApiError.badRequest("Пользователь с такой эл. почтой уже существует")
        );
      }
      const userRole = await Role.findOne({ where: { name: "CONFECTIONER" } });

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        name,
        lastName,
        middleName,
        email,
        password: hashPassword,
        roleId: userRole.id,
      });

      const confectionerInfo = await ConfectionerInfo.create({
        userId: user.id,
        city,
        phone,
        isDelivery,
        pastryShop,
      });

      if (socialMedia) {
        socialMedia.forEach((i) => {
          if (i.link) {
            SocialMedia.create({
              link: i.link,
              confectionerInfoId: confectionerInfo.id,
              socialMediaTypeId: i.id,
            });
          }
        });
      }

      const token = generateJwt(user.id, user.email, userRole); // генерация токена

      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // стать кондитером
  async becomeConfectioner(req, res, next) {
    try {
      const {
        city,
        phone,
        pastryShop,
        description,
        socialMedia,
        isDelivery = false,
      } = req.body;

      const { id } = req.user;

      const user = await User.findByPk(id, { include: Role });
      if (user.role.name !== "USER") {
        return next(ApiError.badRequest("Вы уже являетесь кондитером"));
      }

      const userRole = await Role.findOne({ where: { name: "CONFECTIONER" } });

      user.roleId = userRole.id;

      await user.save();

      const confectionerInfo = await ConfectionerInfo.create({
        userId: user.id,
        city,
        phone,
        pastryShop,
        description,
        isDelivery,
      });

      if (socialMedia) {
        socialMedia.forEach((i) => {
          if (i.link) {
            SocialMedia.create({
              link: i.link,
              confectionerInfoId: confectionerInfo.id,
              socialMediaTypeId: i.id,
            });
          }
        });
      }

      const confectioner = await User.findByPk(id, {
        include: [{ model: ConfectionerInfo }, { model: Role }],
      });

      const token = generateJwt(user.id, user.email, userRole);

      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // авторизация
  async login(req, res, next) {
    const { email, password } = req.body;
    // проверка на то, что пользователь с таким email есть в БД
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role }],
    });
    // если пользователь не найден
    if (!user) {
      return next(ApiError.internal("Неверная эл. почта!"));
    }

    // сравниваем пароли: пароль, который ввел пользователь, и пароль из БД
    let comparePassword = bcrypt.compareSync(password, user.password);

    // если пароли не совпадают
    if (!comparePassword) {
      return next(ApiError.internal("Неверный пароль!"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    console.log("token", user.id, user.email, user.role);

    return res.json({ token });
  }

  // получение конкретного кондитера
  async getOneConfectioner(req, res, next) {
    try {
      const { id } = req.params;
      const confectioner = await User.findByPk(id, {
        order: [[{ model: Dessert }, { model: Review }, "createdAt", "desc"]],
        include: [
          {
            model: ConfectionerInfo,
            include: [
              { model: SocialMedia, include: [{ model: SocialMediaType }] },
            ],
          },
          {
            model: Dessert,
            include: [
              { model: Review, include: [{ model: User }] },
              { model: Type },
              {
                model: DessertInfo,
                include: [
                  {
                    model: DessertImage,
                  },
                ],
              },
            ],
          },
        ],
      });

      if (!confectioner) {
        ApiError.forbidden("У вас нет доступа к этому профилю");
      }
      return res.json(confectioner);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // получение информации для профиля
  async getProfile(req, res, next) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id, {
        include: [
          {
            model: ConfectionerInfo,
            include: [
              { model: SocialMedia, include: [{ model: SocialMediaType }] },
            ],
          },
          { model: Role },
        ],
      });

      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // обновление аватара
  async updateAvatar(req, res, next) {
    try {
      const { id } = req.user;
      let { avatar } = req.files;

      const user = await User.findByPk(id);

      let fileName = uuid.v4() + ".jpg";
      avatar.mv(path.resolve(__dirname, "..", "static", fileName));

      await user.update({ img: fileName });

      return res.json(fileName);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // обновление информации о пользователе
  async updateUser(req, res, next) {
    try {
      const {
        name,
        lastName,
        middleName,
        email,
        password,
        city,
        phone,
        socialMedia,
        description,
        isDelivery = false,
        pastryShop = null,
      } = req.body;

      const { id } = req.user;

      const user = await User.findByPk(id, { include: { model: Role } });

      await user.update({
        name,
        lastName,
        middleName,
        email,
      });

      if (password) {
        const hashPassword = await bcrypt.hash(password, 5);
        await user.update({
          password: hashPassword,
        });
      }

      if (user.role.name === "CONFECTIONER") {
        const confectionerInfo = await ConfectionerInfo.findOne({
          where: { userId: user.id },
        });
        await confectionerInfo.update({
          city,
          phone,
          isDelivery,
          pastryShop,
          description,
        });

        if (socialMedia) {
          socialMedia.forEach(async (i) => {
            const foundSocial = await SocialMedia.findOne({
              where: {
                confectionerInfoId: confectionerInfo.id,
                socialMediaTypeId: i.id,
              },
            });
            // console.log("///////////////////////", foundSocial);
            // console.log("...........................", i);

            if (i?.link && foundSocial) {
              // await foundSocial.update({
              //   link: i.link,
              // });
              foundSocial.link = i.link;
              await foundSocial.save();
            } else if (i.link && !foundSocial) {
              console.log("................................");
              await SocialMedia.create({
                link: i.link,
                confectionerInfoId: confectionerInfo.id,
                socialMediaTypeId: i.id,
              });
            }
          });
        }
      }

      return res.json(user);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // получение всех кондитеров
  async getAllConfectioners(req, res, next) {
    try {
      let { typeId, limit, page, city } = req.query; // тип будем получать из строки запроса
      page = page || 1; // текущая страница или 1-я по умолчанию
      limit = limit || 9; // если лимит не указан, то по 9 десертов на странице
      let offset = page * limit - limit; // отступ (сколько товаров нужно пропустить)
      let confectioners;
      // все десерты

      confectioners = await User.findAndCountAll({
        distinct: true,
        include: [
          { model: ConfectionerInfo, where: { city } },
          { model: Role, where: { name: "CONFECTIONER" } },
          {
            model: Dessert,
            include: [{ model: Review }, { model: Type }],
          },
        ],
        limit,
        offset,
      });

      return res.json(confectioners);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  // проверяем авторизован ли пользователь
  async check(req, res, next) {
    // будем генерировать новый токен
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
}

module.exports = new UserController();
