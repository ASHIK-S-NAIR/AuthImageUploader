const express = require("express");
const { login, signup } = require("../controllers/auth");
const {
  signupValidationSchema,
  loginValidationSchema,
} = require("../middleware/validation/authSchema");
const {
  validateRequestSchema,
} = require("../middleware/validation/validate-request-schema");
const router = express.Router();

router.post(
  "/auth/signup",
  signupValidationSchema,
  validateRequestSchema,
  signup
);
router.post("/auth/login", loginValidationSchema, validateRequestSchema, login);

module.exports = router;
