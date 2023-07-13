const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

// 게시글 관련 API를 모두 /controllers/02_post_controller.js로 전송
const PostsController = require("../controllers/02_post_controller");
const postsController = new PostsController();

// 게시글 작성 API
router.post("/posts", authMiddleware, postsController.createPost);

// 게시글 목록 조회 API
router.get("/posts", postsController.getPostList);

// 게시글 상세 조회 API
router.get("/posts/:postId", postsController.getPost);

// 게시글 수정 API
router.put("/posts/:postId", authMiddleware, postsController.updatePost);

// 게시글 삭제 API
router.delete("/posts/:postId", authMiddleware, postsController.deletePost);

module.exports = router;
