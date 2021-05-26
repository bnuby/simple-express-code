const axios = require("axios");

const client = axios.default.create();

client.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    console.error(error);
    throw error;
  }
);

const GetComments = (post_id = "") => {
  const url = new URLSearchParams({});
  if (post_id) {
    url.append("postId", post_id);
  }
  return client.get(
    "https://jsonplaceholder.typicode.com/comments?" + url.toString()
  );
};

const ViewSinglePost = (post_id) => {
  return client.get(`https://jsonplaceholder.typicode.com/posts/${post_id}`);
};

const ViewAllPosts = () => {
  return client.get(`https://jsonplaceholder.typicode.com/posts`);
};

module.exports = {
  GetComments,
  ViewSinglePost,
  ViewAllPosts,
};
