const { groupBy, reduce, get } = require("lodash");
const { ViewAllPosts, ViewSinglePost, GetComments } = require("./json.service");
const { formatPostModel, formatCommentModel } = require("./model");

const GetPostsService = async (req, res) => {
  const { query } = req;

  const replaceKeys = {
    post_title: "title",
    post_body: "body",
  };

  // Fetch Post data
  const [posts, commentCountById] = await Promise.all([
    ViewAllPosts().then((data) => {
      // Wildcard search
      return data.filter((data) => {
        let result = true;
        for (const [key, newKey] of Object.entries(replaceKeys)) {
          if (query[key] && !new RegExp(query[key]).test(data[newKey])) {
            result = false;
          }
        }
        return result;
      });
      // filter post
    }),
    GetComments().then((data) =>
      reduce(
        groupBy(data, (i) => i.postId),
        (c, i, key) => {
          return {
            ...c,
            [key]: i.length,
          };
        },
        {}
      )
    ),
  ]);

  return res.status(200).json({
    status: true,
    message: "get post",
    data: posts
      .map((post) => ({
        ...post,
        numberOfComments: get(commentCountById, post.id, 0),
      }))
      .map(formatPostModel),
  });
};

const GetPostService = async (req, res) => {
  const { params } = req;
  const post = await ViewSinglePost(params.post_id);
  return res.status(200).json({
    status: true,
    message: "get single post.",
    data: post,
  });
};

const GetCommentsService = async (req, res) => {
  const comments = await GetComments();

  // format Data
  return res.status(200).json({
    status: true,
    message: "Get Comments",
    data: comments.map(formatCommentModel),
  });
};

const GetCommentsByPostIdService = async (req, res) => {
  const { params } = req;

  const comments = await GetComments(params.post_id);

  // format Data
  return res.status(200).json({
    status: true,
    message: "Get single comment",
    data: comments.map(formatCommentModel),
  });
};

module.exports = {
  GetPostsService,
  GetPostService,
  GetCommentsService,
  GetCommentsByPostIdService,
};
