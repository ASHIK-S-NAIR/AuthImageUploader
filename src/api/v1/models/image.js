const { Schema, model } = require("mongoose");

const imageSchema = new Schema(
  {
    imagePublicId: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      require: true,
      unique: true,
    },
    imageUploadedBy: {
      userFirstName: {
        type: String,
        required: true,
      },
      userLastName: {
        type: String,
        required: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("Image", imageSchema);
