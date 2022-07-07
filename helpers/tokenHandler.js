const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helpers/errorHandler");
const config = require("../config/config.json");

const ACCESS_JWT_KEY = process.env.ACCESS_JWT_KEY;

const accessOptions = { expiresIn: config.access_token_exp };

module.exports.generateTokens = (userId) => {
  try {
    const accessToken = jwt.sign({ userId }, ACCESS_JWT_KEY, accessOptions);
    return { accessToken };
  } catch (error) {
    return errorResponse("Unauthorized", error);
  }
};

module.exports.verifyToken = (token) => {
  try {
    const user = jwt.verify(token, ACCESS_JWT_KEY);

    if (!user) {
      return errorResponse("Unauthorized");
    }

    return user;
  } catch (error) {
    return errorResponse("Unauthorized", error);
  }
};
