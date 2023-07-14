const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

const LikesController = require("../controllers/04_like_controller");
const likesController = new LikesController();

// 게시글 좋아요 API
router.put("/posts/:postId/like", authMiddleware, likesController.likeComment);

// 좋아요 게시글 조회 API
router.get("/likePost", authMiddleware, likesController.getLikedPost);

module.exports = router;
