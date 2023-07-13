const express = require("express");
const router = express.Router();

// 사용자 관련 API를 모두 /controllers/01_user_controller.js로 전송
const UsersController = require("../controllers/01_user_controller");
const usersController = new UsersController();

// 회원 가입 API
router.post("/users", usersController.createUser);

// 로그인 API
router.post("/login", usersController.logIn);

module.exports = router;
