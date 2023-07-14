const LikeRepository = require("../repositories/04_like_repository");

class LikeService {
  likeRepository = new LikeRepository();

  // 게시글 찾기
  findOnePost = async (postId) => {
    const onePost = await this.likeRepository.fineOnePost(postId);

    if (!onePost) {
      console.log("게시글이 존재하지 않습니다.");
      return;
    }

    return {
      postId: onePost.postId,
      userId: onePost.UserId,
      title: onePost.title,
      content: onePost.content,
      createdAt: onePost.createdAt,
      updatedAt: onePost.updatedAt,
    };
  };

  // 기존 좋아요 내역 확인
  findLikedPost = async (postId, userId) => {
    const checkLikes = await this.likeRepository.findLikedPost(postId, userId);

    if (checkLikes === null) {
      return null;
    }

    return {
      likeId: checkLikes.likeId,
      postId: checkLikes.PostId,
      userId: checkLikes.UserId,
    };
  };

  // 게시글 좋아요
  addLike = async (postId, userId) => {
    await this.likeRepository.addLikePost(postId, userId);

    return;
  };

  // 게시글 좋아요 취소
  subLike = async (postId, userId) => {
    await this.likeRepository.subLikePost(postId, userId);

    return;
  };

  // 좋아요 게시글 조회 API
  findLikedPost = async (userId) => {
    const findLikedPostData = await this.likeRepository.findLikedPost(userId);

    // 1. postId, userId, email, title, createdAt, updatedAt으로 출력
    // 2. 좋아요 개수 파악하여 내림차순 정렬

    // return;
    return {
      postId: findLikedPostData.PostId,
      userId: findLikedPostData.UserId,
      email: findLikedPostData.email,
      title: findLikedPostData.title,
      createdAt: findLikedPostData.createdAt,
      updatedAt: findLikedPostData.updatedAt,
    };
  };
}

module.exports = LikeService;
