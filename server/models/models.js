const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  middleName: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING },
});

const Role = sequelize.define("role", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, defaultValue: "USER" },
});

const ConfectionerInfo = sequelize.define("confectioner_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  city: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, unique: true, allowNull: false },
  isDelivery: { type: DataTypes.BOOLEAN, allowNull: false },
  pastryShop: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING(1000) },
});

const SocialMedia = sequelize.define("social_media", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  link: { type: DataTypes.STRING, allowNull: false },
});

const SocialMediaType = sequelize.define("social_media_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const FavouriteDessert = sequelize.define("favourite_dessert", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Dessert = sequelize.define("dessert", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const DessertInfo = sequelize.define("dessert_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  pricePer: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING(1024), allowNull: false },
  ingredients: { type: DataTypes.STRING },
  storageTemp: { type: DataTypes.STRING },
  shelfLife: { type: DataTypes.STRING },
});

const DessertImage = sequelize.define("dessert_image", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Review = sequelize.define("review", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  review: { type: DataTypes.STRING },
});

// Описание связей между моделями
User.hasOne(ConfectionerInfo);
ConfectionerInfo.belongsTo(User);

User.hasMany(Dessert);
Dessert.belongsTo(User);

User.hasMany(FavouriteDessert);
FavouriteDessert.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Role.hasMany(User);
User.belongsTo(Role);

ConfectionerInfo.hasMany(SocialMedia);
SocialMedia.belongsTo(ConfectionerInfo);

SocialMediaType.hasMany(SocialMedia);
SocialMedia.belongsTo(SocialMediaType);

Type.hasMany(Dessert);
Dessert.belongsTo(Type);

DessertInfo.hasOne(Dessert);
Dessert.belongsTo(DessertInfo);

DessertInfo.hasMany(DessertImage);
DessertImage.belongsTo(DessertInfo);

Dessert.hasMany(Review);
Review.belongsTo(Dessert);

Dessert.hasMany(FavouriteDessert);
FavouriteDessert.belongsTo(Dessert);

module.exports = {
  User,
  Role,
  ConfectionerInfo,
  SocialMedia,
  SocialMediaType,
  Dessert,
  DessertInfo,
  Type,
  Review,
  FavouriteDessert,
  DessertImage,
};
