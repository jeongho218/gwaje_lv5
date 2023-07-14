const { Likes, Posts } = require("../models");
const { Op } = require("sequelize");

class LikeRepository {
  // 게시글 찾기
  fineOnePost = async (postId) => {
    const post = await Posts.findOne({ where: { postId: postId } });
    return post;
  };

  // 기존 좋아요 내역 확인
  findLikedPost = async (postId, userId) => {
    const likedPost = await Likes.findOne({
      where: {
        [Op.and]: [{ PostId: postId }, { UserId: userId }],
      },
    });

    if (likedPost === null) {
      return null; // 좋아요가 없는 경우 null 반환
    }

    return likedPost;
  };

  // 게시글 좋아요
  addLikePost = async (postId, userId) => {
    try {
      const createLikeData = await Likes.create({
        PostId: postId,
        UserId: userId,
      });

      return createLikeData;
    } catch (error) {
      console.log(error);
    }
  };

  // 게시글 좋아요 취소
  subLikePost = async (postId, userId) => {
    await Likes.destroy({
      where: { [Op.and]: [{ PostId: postId }, { UserId: userId }] },
    });
    return;
  };

  // 좋아요 게시글 조회
  findLikedPost = async (userId) => {
    const likedPosts = await Likes.findAll({
      where: { UserId: userId },
      attributes: ["UserId"],
      include: {
        model: Posts,
        // where: { postId: postId },
        attributes: [
          "postId",
          "UserId",
          "title",
          "content",
          "createdAt",
          "updatedAt",
        ],
      },
    });

    // const likedPosts = await Likes.findAll({ where: { UserId: userId } });

    return likedPosts;
  };
}

module.exports = LikeRepository;
