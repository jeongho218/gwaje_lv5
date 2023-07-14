const CommentService = require("../services/03_comment_service");

class CommentsController {
  commentService = new CommentService();

  // 댓글 작성 API
  createComment = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;

    if (!userId) {
      res.status(403).json({ errorMessage: "로그인 후 사용 가능합니다." });
      return;
    }

    if (!comment) {
      return res
        .status(400)
        .json({ errorMessage: "댓글의 형식이 올바르지 않습니다." });
    }

    try {
      const createdComment = await this.commentService.createComment(
        userId,
        postId,
        comment
      );

      return res.status(200).json({ message: "댓글이 등록되었습니다." });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: "댓글 작성에 실패하였습니다." });
    }
  };

  // 댓글 조회 API
  getComment = async (req, res) => {
    const { postId } = req.params;

    try {
      const comment = await this.commentService.getComment(postId);

      return res.status(200).json({ comments: comment });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: "댓글 조회에 실패하였습니다." });
    }
  };
  // 댓글 수정 API
  updateComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    const { comment } = req.body;

    if (!userId) {
      return res
        .status(403)
        .json({ errorMessage: "로그인이 필요한 기능입니다." });
    }

    if (!comment) {
      return res
        .status(400)
        .json({ errorMessage: "댓글의 데이터 형식이 올바르지 않습니다." });
    }

    try {
      const updatedComment = await this.commentService.updateComment(
        userId,
        postId,
        commentId,
        comment
      );

      return res.status(200).json({ message: "댓글이 수정되었습니다." });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: "댓글 수정에 실패하였습니다." });
    }
  };

  // 댓글 삭제 API
  deleteComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    console.log("현재 접속한 사용자의 ID", userId);

    if (!userId) {
      return res
        .status(403)
        .json({ errorMessage: "로그인이 필요한 기능입니다." });
    }

    try {
      await this.commentService.deleteComment(userId, postId, commentId);
      return res.status(200).json({ message: "댓글이 삭제되었습니다." });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: "댓글 삭제에 실패하였습니다." });
    }
  };
}

module.exports = CommentsController;
