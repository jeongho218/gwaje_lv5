const { Posts } = require("../models");

class PostRepository {
  // 게시글 작성
  createPost = async (userId, title, content) => {
    const createPostData = await Posts.create({
      UserId: userId,
      title,
      content,
    });

    return createPostData;
  };

  // 게시글 목록 조회
  findPostList = async () => {
    const posts = await Posts.findAll();

    return posts;
  };

  // 게시글 상세 조회
  fineOnePost = async (postId) => {
    const post = await Posts.findOne({ where: { postId: postId } });
    return post;
  };

  // 게시글 수정
  updatePost = async (postId, title, content) => {
    const updatePost = await Posts.update(
      {
        title,
        content,
      },
      { where: { postId: postId } }
    );
    return updatePost;
  };

  // 게시글 삭제
  deletePost = async (postId) => {
    const deletePost = await Posts.destroy({ where: { postId: postId } });
    return deletePost;
  };
}

module.exports = PostRepository;
