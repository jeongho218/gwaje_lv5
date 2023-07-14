const PostService = require("../services/02_post_service");

class PostsController {
  postService = new PostService();

  // 게시글 작성 API
  createPost = async (req, res) => {
    const { userId } = res.locals.user;
    const { title, content } = req.body;

    if (!userId) {
      return res
        .status(403)
        .json({ errorMessage: "로그인 후 사용 가능합니다." });
    }

    if (!title) {
      return res
        .status(400)
        .json({ errorMessage: "게시글 제목의 형식이 일치하지 않습니다." });
    }

    if (!content) {
      return res
        .status(400)
        .json({ errorMessage: "게시글 내용의 형식이 일치하지 않습니다." });
    }

    try {
      const post = await this.postService.createPost(userId, title, content);
      return res
        .status(201)
        .json({ data: post, message: "게시글이 등록되었습니다." });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: "게시글 작성에 실패하였습니다." });
    }
  };

  // 게시글 목록 조회 API
  getPostList = async (req, res) => {
    try {
      const posts = await this.postService.findPostList();

      return res.status(200).json({ posts: posts });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: "게시글 조회에 실패하였습니다." });
    }
  };

  // 게시글 상세 조회 API
  getPost = async (req, res) => {
    try {
      const { postId } = req.params;

      const post = await this.postService.findOnePost(postId);

      if (!post) {
        return res
          .status(404)
          .json({ errorMessage: "게시글을 찾을 수 없습니다." });
      }
      // 존재하지 않는 postId를 요청하면 404가 아닌 400 조회 실패가 나옴
      // 어떻게 해야하지?

      return res.status(200).json({ post: post });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: "게시글 조회에 실패하였습니다." });
    }
  };

  // 게시글 수정 API
  updatePost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title, content } = req.body;

    const post = await this.postService.updatePost(postId);
    console.log("현재 접속한 사용자의 ID", userId);

    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    if (!userId) {
      return res.status(403).json({
        errorMessage:
          "게시글 수정 권한이 존재하지 않습니다. 로그인 후 사용 가능합니다.",
      });
    }

    if (!title) {
      res
        .status(400)
        .json({ errorMessage: "게시글 제목의 형식이 일치하지 않습니다." });
      return;
    }

    if (!content) {
      res
        .status(400)
        .json({ errorMessage: "게시글 내용의 형식이 일치하지 않습니다." });
      return;
    }

    try {
      const post = await this.postService.updatePost(postId, title, content);
      return res.status(200).json({ message: "게시글이 수정되었습니다." });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: "게시글 수정에 실패하였습니다." });
    }
  };

  // 게시글 삭제 API
  deletePost = async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const post = await this.postService.findOnePost(postId);
    console.log("현재 접속한 사용자의 ID", userId);

    if (!post) {
      return res.status(404).json({
        errorMessage: "게시글이 존재하지 않습니다.",
      });
    }

    if (!userId) {
      return res.status(403).json({
        errorMessage:
          "게시글의 삭제 권한이 존재하지 않습니다. 로그인 후 사용 가능합니다.",
      });
    }

    try {
      await this.postService.deletePost(postId);
      return res.status(200).json({ message: "게시글이 삭제되었습니다." });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: "게시글 삭제에 실패하였습니다." });
    }
  };
}

module.exports = PostsController;
