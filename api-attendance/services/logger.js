const winston = require("winston");

module.exports = winston.createLogger({
    transports: [
      new winston.transports.File({ filename: './logfile/errors.log' })
    ],
});


