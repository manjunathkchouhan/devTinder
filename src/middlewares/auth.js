const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Unauthorized");
    }
    const decoded = jwt.verify(token, "DevTinderSecretKey");
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user; // Attach user to request object
    next(); // Call next middleware or route handler
  } catch (err) {
    res.status(401).send("Unauthorized: " + err.message);
  }
};

module.exports = userAuth;
