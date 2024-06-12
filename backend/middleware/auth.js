const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  console.log("🚀 ~ authenticate ~ token:", token)
  // middleware for checking if user is logged in
  if (!token) {
    return res.status(400).json([{ msg: "Token is not present" }]);
  } else {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log("🚀 ~ authenticate ~ decoded:", decoded);
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json([{ msg: "Token not Valid" }]);
      console.log(error);
    }
  }
};

module.exports = authenticate;
