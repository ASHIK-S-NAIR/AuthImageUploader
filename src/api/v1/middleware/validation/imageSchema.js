const { body } = require("express-validator");

exports.imageSchema = [
  body("image").exists({ checkNull: true }).withMessage("image is required"),
];
