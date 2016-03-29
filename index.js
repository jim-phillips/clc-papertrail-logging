'use strict';
const NODE_ENV = process.env.NODE_ENV,
  logger = require('winston');
let papertrailPort = process.env.PAPERTRAIL_PORT;

// ensure stack for errors
function showStack(args) {
  const LAST_KEY = args.length - 1;
  if (args[LAST_KEY] && args[LAST_KEY] instanceof Error) {
    args[LAST_KEY] = args[LAST_KEY].stack;
  }
  return args;
}

if (NODE_ENV === 'dev' || NODE_ENV === 'production' || NODE_ENV === 'staging') {
  // do not print to console in prod
  logger.remove(logger.transports.Console);

  // add papertrail logging
  /* jshint expr: true */
  require('winston-papertrail').Papertrail;
  /* jshint expr: false */
  logger.add(logger.transports.Papertrail,
    {
      host: 'logs3.papertrailapp.com',
      port: papertrailPort,
      colorize: true,
      inlineMeta: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      prettyPrint: true
    }
  );

  // point console logging to winston logger
  console.log = function () {
    logger.info.apply(logger, arguments);
  };
  console.info = function () {
    logger.info.apply(logger, arguments);
  };
  console.error = function () {
    logger.error.apply(logger, showStack(arguments));
  };
  console.warn = function () {
    logger.warn.apply(logger, arguments);
  };
  console.debug = function () {
    logger.debug.apply(logger, arguments);
  };
}

module.exports = logger;
