const { body } = require("express-validator");

exports.signupValidationSchema = [
  body("userFirstName")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("userFirstName is required")
    .isString()
    .withMessage("userFirstName must be as string")
    .isLength({ max: 32 })
    .withMessage("userFirstName legnth must be within 32"),
  body("userLastName")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("userLastName is required")
    .isString()
    .withMessage("userLastName must be as string")
    .isLength({ max: 32 })
    .withMessage("userFirstName legnth must be within 32"),
  body("userEmail")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Email is required")
    .isEmail()
    .withMessage("valid email is needed"),
  body("userPhoneNumber")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("user Phone Number is required")
    .isNumeric()
    .withMessage("user Phone Number must be number")
    .isLength({ min: 10, max: 10 })
    .withMessage("user phone number must be 10 digits"),
  body("userPassword")
    .isLength({ min: 6 })
    .withMessage("password must be atleat 6 characters"),
];

exports.loginValidationSchema = [
  body("userEmail")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("user Email is required")
    .isString()
    .withMessage("user Email must be string"),
  body("userPassword")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("user password is required"),
];
