const jwt = require("jsonwebtoken");

exports.isSignedIn = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET);

      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Auth failed",
      });
    }
  }
  return res
    .status(400)
    .json({ message: "Valid authorization token required" });
};

exports.isAuthenticated = (req, res, next) => {
  try {
    const checker = req.profile && req.user && req.user._id == req.profile._id;
    if (!checker) {
      return res.status(500).json({ message: "Authentication Failed" });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Failed to authenticate user",
    });
  }
};
