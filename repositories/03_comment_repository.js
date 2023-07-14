const { Comments } = require("../models");
const { Op } = require("sequelize");

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
  updateComment = async (userId, postId, commentId, comment) => {
    const updateComment = await Comments.update(
      { comment: comment },
      {
        where: {
          [Op.and]: [
            { commentId: commentId },
            { PostId: postId },
            { UserId: userId },
          ],
        },
      }
    );

    return updateComment;
  };

  // 댓글 삭제
  deleteComment = async (userId, postId, commentId) => {
    await Comments.destroy({
      where: {
        [Op.and]: [
          { commentId: commentId },
          { PostId: postId },
          { UserId: userId },
        ],
      },
    });
    return;
  };
}

module.exports = CommentRepository;
