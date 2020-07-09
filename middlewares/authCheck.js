const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //Get token from header
  const token = req.header("x-auth-token");

  //Verify token: exists
  if (!token) {
    return res.status(401).json({ message: "Authorization failed : no token" });
  }

  //Decoding token and verify if it's valid
  try {
    const decodedToken = jwt.verify(token, config.get("jwtSecretKey"));
    console.log(decodedToken);
    req.userId = decodedToken.id;
    //console.log(req.userId);
    next();
  } catch (err) {
    res.status(401).json({ message: "Authorization failed: invalid token " });
  }
};
