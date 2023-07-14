const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

// 댓글 관련 API를 모두 /controllers/03_comment_controller.js로 전송
const CommentsController = require("../controllers/03_comment_controller");
const commentsController = new CommentsController();

// 댓글 작성 API
router.post(
  "/posts/:postId/comments",
  authMiddleware,
  commentsController.createComment
);

// 댓글 조회 API
router.get("/posts/:postId/comments", commentsController.getComment);

// 댓글 수정 API
router.put(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  commentsController.updateComment
);

// 댓글 삭제 API
router.delete(
  "/posts/:postId/comments/:commentId",
  authMiddleware,
  commentsController.deleteComment
);

module.exports = router;
