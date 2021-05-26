const express = require("express");
require("dotenv").config();
require("express-async-errors");

// Internal Lib
const errorHandler = require("./errorHandler");
const {
  GetSinglePostValidator,
  GetCommentByPostIdValidator,
  CheckValidatorErrors,
} = require("./validator");

const JsonPlaceholderService = require("./json-placeholder.service");

const app = express();

app.use(express.json());

// Add timestamp to console
require("console-stamp")(console);

// Simple Log Middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

app.get("/posts", JsonPlaceholderService.GetPostsService);
app.get(
  "/post/:post_id",
  GetSinglePostValidator,
  CheckValidatorErrors,
  JsonPlaceholderService.GetPostService
);
app.get("/comments", JsonPlaceholderService.GetCommentsService);
app.get(
  "/comment/:post_id",
  GetCommentByPostIdValidator,
  CheckValidatorErrors,
  JsonPlaceholderService.GetCommentsByPostIdService
);

// Error Handler
app.use(errorHandler);

const { PORT } = process.env;

app.listen(PORT, function () {
  console.log("Server started at ", PORT);
});
