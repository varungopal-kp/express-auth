const winston = require("winston");

const logger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { date: new Date() },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

module.exports = logger;
