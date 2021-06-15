const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

const auth = (req, res, next) => {
  const token = req.header("x-access-token");
  if (!token) return res.status(401).json({ msg: "no authentication token" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified)
      return res.status(401).json({ msg: "Token verification failed" });

    req.user = verified.id;

    next();
  } catch (err) {
    return catchError(err, res);
  }
};

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token expired!" });
  }
  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

module.exports = auth;
