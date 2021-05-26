const { checkSchema, validationResult } = require("express-validator");
const { BadRequest } = require("http-errors");

const GetSinglePostValidator = checkSchema({
  post_id: {
    in: ["params"],
    errorMessage: 'Post id must need integer.',
    isInt: true,
    toInt: true,
  },
});

const GetCommentByPostIdValidator = checkSchema({
  post_id: {
    in: ["params"],
    errorMessage: 'Post id must need integer.',
    isInt: true,
    toInt: true,
  },
});

const CheckValidatorErrors = (req, res, next) => {
  const result = validationResult(req);

  if (result.errors.length) {
    throw BadRequest(result.errors);
  }

  next();
};

module.exports = {
  GetSinglePostValidator,
  GetCommentByPostIdValidator,
  CheckValidatorErrors,
};
