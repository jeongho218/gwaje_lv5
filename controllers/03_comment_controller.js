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

    // const isExistPost = await Posts.findOne({
    //   where: { postId: postId },
    // });

    // const isExistComment = await Comments.findOne({
    //   where: { PostId: postId },
    // });

    // if (!isExistPost) {
    //   return res
    //     .status(404)
    //     .json({ errorMessage: "게시글 번호를 다시 확인해주세요" });
    // }

    // if (!isExistComment) {
    //   return res
    //     .status(404)
    //     .json({ errorMessage: "게시글에 댓글이 등록되어있지 않습니다." });
    // }

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

  // 댓글 삭제 API
}

module.exports = CommentsController;
