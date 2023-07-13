const { Comments, Posts } = require("../models");

class CommentRepository {
  // 댓글 작성
  createComment = async (userId, postId, comment) => {
    const createCommentData = await Comments.create({
      UserId: userId,
      PostId: postId,
      comment,
    });

    return createCommentData;
  };

  // 댓글 조회
  getComment = async (postId) => {
    const getCommentData = await Comments.findAll({
      where: { PostId: postId },
    });
    return getCommentData;
  };
  // 댓글 수정
  // 댓글 삭제
}

module.exports = CommentRepository;
