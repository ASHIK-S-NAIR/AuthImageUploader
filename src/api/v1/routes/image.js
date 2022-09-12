const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadImage } = require("../controllers/images");
const maxSize = 0.5 * 1024 * 1024;
var upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
  limits: { fileSize: maxSize },
});
const { isSignedIn, isAuthenticated } = require("../middleware/auth");
const { getUserById } = require("../middleware/users");
const { imageSchema } = require("../middleware/validation/imageSchema");
const {
  validateRequestSchema,
} = require("../middleware/validation/validate-request-schema");

router.param("userId", getUserById);

router.post(
  "/image/:userId",
  isSignedIn,
  isAuthenticated,
  upload.single("image"),
  imageSchema,
  validateRequestSchema,
  uploadImage
);

module.exports = router;
