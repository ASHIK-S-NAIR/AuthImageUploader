const User = require("../models/users");

exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({
        message: "user not found in DB",
      });
    }
    req.profile = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get customer by id",
    });
  }
};
