const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const expressJWT = require("express-jwt");

exports.signup = async (req, res) => {
  const {
    userFirstName,
    userLastName,
    userEmail,
    userPassword,
    userPhoneNumber,
  } = req.body;
  try {
    const user = await User.create({
      userFirstName,
      userLastName,
      userEmail,
      userPhoneNumber,
      userPassword,
    });
    await user.save();
    return res
      .status(201)
      .json({ userFirstName, userLastName, userEmail, userPhoneNumber });
  } catch (error) {
    console.log("eror", error.message)
    return res.status(500).json({
      message: "Failed to signup",
    });
  }
};

exports.login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(400).json({
        error: "Invalid email or password",
      });
    }

    if (await user.authenticate(userPassword)) {
      const token = jwt.sign({ _id: user._id }, process.env.SECRET);
      const { _id, userFirstName, userLastName, userEmail, userPhoneNumber } =
        user;
      return res.status(200).json({
        token,
        user: {
          _id,
          userFirstName,
          userLastName,
          userEmail,
          userPhoneNumber,
        },
      });
    }

    return res.status(500).json({
      error: "Invalid email or password",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to login",
    });
  }
};
