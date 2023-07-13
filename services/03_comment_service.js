const CommentRepository = require("../repositories/03_comment_repository");

class CommentService {
  commentRepository = new CommentRepository();

  // 댓글 작성 API
  createComment = async (userId, postId, comment) => {
    const createCommentData = await this.commentRepository.createComment(
      userId,
      postId,
      comment
    );
  };

  // 댓글 조회 API
  getComment = async (postId) => {
    const getCommentData = await this.commentRepository.getComment(postId);

    getCommentData.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return getCommentData.map((comment) => {
      return {
        postId: comment.PostId,
        userId: comment.UserId,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
  };

  // 댓글 수정 API

  // 댓글 삭제 API
}

module.exports = CommentService;
