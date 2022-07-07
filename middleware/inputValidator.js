const logger = require("../config/logger");
const sanitize = require("mongo-sanitize");

const niv = require("node-input-validator");

niv.setStrNotationRepetition(2000000000);

const Validator = niv.Validator;

exports.validate = function (attributes, urlParam = false) {
  return async (req, res, next) => {
    let url = req.originalUrl;
    if (urlParam) {
      url = urlParam;
    }
    try {
      url = req.originalUrl
      const input = req.body;
      const v = new Validator(input, attributes);

      const matched = await v.check();
      if (!matched) {
        req.session.flash = { error: "Input validation failed" };
        return res.redirect(url);
      }
      req.body = sanitize(req.body);
      next();
    } catch (error) {
      logger.log("error", error.toString());
      req.session.flash = {
        error: "Input validation failed, Something went wrong!",
      };
      return res.redirect(url);
    }
  };
};
