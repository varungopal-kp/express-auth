const logger = require("../config/logger");

exports.createError = function (error) {
  exports.errorLog(error.toString());
  throw error;
};

exports.errorResponse = function (message = "Failed", error = {}) {
  let errorMsg = exports.getErrorMessage(message, error);
  throw { errorMsg };
};

exports.getErrorMessage = function (message, error) {
  if (error && error.stack && error.message) {
    exports.errorLog(error.toString());
    return message;
  } else if (error.errorMsg) {
    return error.errorMsg;
  }
  return message;
};

exports.errorLog = function (error) {
  return logger.log("error", error.toString());
};
