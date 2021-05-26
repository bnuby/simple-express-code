const formatPostModel = (post) => {
  return {
    post_id: post.id || "",
    post_title: post.title || "",
    post_body: post.body || "",
    total_number_of_comments: post.numberOfComments || 0,
  };
};

const formatCommentModel = (comment) => ({
  post_id: comment.postId || "",
  comment_id: comment.id || "",
  comment_name: comment.name || "",
  comment_email: comment.email || "",
  comment_body: comment.body || "",
});

module.exports = {
  formatPostModel,
  formatCommentModel,
};
