const Image = require("../models/images");
const cloudinary = require("../../../../setup/cloudinary");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

exports.uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const result = await cloudinary.uploader.upload(file?.path, {
      folder: "authenticatedImageUploadApi",
    });
    await unlinkFile(file?.path);

    const image = await Image.create({
      imagePublicId: result.public_id,
      imageUrl: result.secure_url,
      imageUploadedBy: {
        userFirstName: req.profile.userFirstName,
        userLastName: req.profile.userLastName,
        userId: req.profile._id,
      },
    });

    image.save();

    const { imagePublicId, imageUrl, imageUploadedBy } = image;

    return res.status(201).json({ imagePublicId, imageUrl, imageUploadedBy });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Failed to upload Image",
    });
  }
};
