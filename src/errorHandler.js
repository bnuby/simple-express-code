const {
  BadRequest,
  Unauthorized,
  PaymentRequired,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  NotAcceptable,
  ProxyAuthenticationRequired,
  RequestTimeout,
  Conflict,
  Gone,
  LengthRequired,
  PreconditionFailed,
  PayloadTooLarge,
  UnsupportedMediaType,
  RangeNotSatisfiable,
  ExpectationFailed,
  ImATeapot,
  MisdirectedRequest,
  UnprocessableEntity,
  Locked,
  FailedDependency,
  UnorderedCollection,
  UpgradeRequired,
  PreconditionRequired,
  TooManyRequests,
  RequestHeaderFieldsTooLarge,
  UnavailableForLegalReasons,
} = require("http-errors");

module.exports = (error, req, res, next) => {
  const ERROR_TYPES = [
    BadRequest,
    Unauthorized,
    PaymentRequired,
    Forbidden,
    NotFound,
    MethodNotAllowed,
    NotAcceptable,
    NotAcceptable,
    ProxyAuthenticationRequired,
    RequestTimeout,
    Conflict,
    Gone,
    LengthRequired,
    PreconditionFailed,
    PayloadTooLarge,
    UnsupportedMediaType,
    RangeNotSatisfiable,
    ExpectationFailed,
    ImATeapot,
    MisdirectedRequest,
    UnprocessableEntity,
    Locked,
    FailedDependency,
    UnorderedCollection,
    UpgradeRequired,
    PreconditionRequired,
    TooManyRequests,
    RequestHeaderFieldsTooLarge,
    UnavailableForLegalReasons,
  ];
  console.error(error)

  const status = error.status;
  if (!!ERROR_TYPES.find((type) => type.name == error.constructor.name)) {
    // Only allow some error
    res.status(status).json({
      status: false,
      message: error.message,
    });
  }

  // Hide Other Error
  res.status(400).json({
    status: false,
    message: 'Server internal error',
  })
};
