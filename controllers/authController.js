const User = require("../models/User");

const config = require("../config/config.json");
const { createError, getErrorMessage } = require("../helpers/errorHandler");
const { generateTokens } = require("../helpers/tokenHandler");

const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  try {
    res.render("auth/login");
  } catch (error) {
    return createError(error);
  }
};

exports.loginSubmit = async (req, res, next) => {
  let params = req.body;
  try {
    const user = await User.findOne({ email: params.email });
    if (!user) {
      req.session.flash = { error: "Wrong credentials" };
      return res.redirect("/login");
    }
    const passwordCheck = bcrypt.compareSync(params.password, user.password);
    if (!passwordCheck) {
      req.session.flash = { error: "Wrong credentials" };
      return res.redirect("/login");
    }
    const _tokens = generateTokens(user._id);

    res.cookie("_accessToken", _tokens.accessToken, { httpOnly: true });

    return res.redirect("/");
  } catch (error) {
    let message = getErrorMessage("Login failed", error);
    req.session.flash = { error: message };
    return res.redirect("/login");
  }
};

exports.register = async (req, res, next) => {
  try {
    res.render("auth/register");
  } catch (error) {
    return createError({ error });
  }
};

exports.registerSubmit = async (req, res, next) => {
  let params = req.body;
  try {
    const userExist = await User.findOne({ email: params.email });
    if (userExist) {
      req.session.flash = { error: "User already exist" };
      return res.redirect("/register");
    }
    params.password = bcrypt.hashSync(params.password, config.jwt_salt);
    const user = await User.create(params);
    const _tokens = generateTokens(user._id);
    res.cookie("_accessToken", _tokens.accessToken, { httpOnly: true });
    return res.redirect("/");
  } catch (error) {
    let message = getErrorMessage("Register failed", error);
    req.session.flash = { error: message };
    return res.redirect("/login");
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("_accessToken");
  req.session.flash = { success: "Logout" };
  return res.redirect("/login");
};
