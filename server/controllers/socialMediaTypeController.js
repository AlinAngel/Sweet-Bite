const { SocialMediaType } = require("../models/models");
const ApiError = require("../error/apiError");

class socialMediaTypeController {
  async create(req, res) {
    const { name } = req.body;
    const socialMediaType = await SocialMediaType.create({ name });
    return res.json(socialMediaType);
  }

  async getAll(req, res) {
    const socialMediaTypes = await SocialMediaType.findAll();
    return res.json(socialMediaTypes);
  }
}

module.exports = new socialMediaTypeController();
