const LikeService = require("../services/04_like_service");

class LikeController {
  likeService = new LikeService();

  // 게시글 좋아요 API
  likeComment = async (req, res) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;

    if (!userId) {
      return res
        .status(403)
        .json({ errorMessage: "로그인 후 사용 가능합니다." });
    }
    console.log("현재 접속한 사용자의 ID", userId);

    // 게시글 찾기
    const existPost = await this.likeService.findOnePost(postId);

    if (!existPost) {
      console.log("existPost2", existPost);
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    try {
      // 좋아요, 좋아요 취소 로직
      // 기존 좋아요 내역 확인
      const didILike = await this.likeService.findLikedPost(postId, userId);

      if (!didILike) {
        // 없다면 좋아요 등록

        await this.likeService.addLike(postId, userId);

        return res.status(200).json({ LIKE: "해당 게시글에 좋아요 했습니다." });
      } else if (didILike) {
        console.log("이미 좋아요 했음");
        // 있다면 좋아요 취소

        await this.likeService.subLike(postId, userId);

        return res
          .status(200)
          .json({ CANCEL: "해당 게시글의 좋아요를 취소했습니다." });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: "좋아요 작업에 실패했습니다." });
    }
  };

  // 좋아요 게시글 조회 API
}

module.exports = LikeController;
