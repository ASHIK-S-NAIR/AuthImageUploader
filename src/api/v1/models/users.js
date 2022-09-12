const { Schema, model } = require("mongoose");
const { createHmac } = require("crypto");
const { v4 } = require("uuid");

const userSchema = new Schema(
  {
    userFirstName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    userLastName: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    userPhoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    userEmail: {
      type: String,
      unique: true,
      maxlength: 32,
    },
    userEncry_password: String,
    salt: String,
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = v4();
    this.userEncry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.userEncry_password;
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) {
      return "";
    }
    try {
      return createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = model("User", userSchema);
