const PostRepository = require("../repositories/02_post_repository");

class PostService {
  postRepository = new PostRepository();

  // 게시글 작성
  createPost = async (userId, title, content) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      title,
      content
    );

    return;
  };

  // 게시글 목록 조회
  findPostList = async () => {
    //
    const postList = await this.postRepository.findPostList();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    postList.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return postList.map((post) => {
      return {
        postId: post.postId,
        email: post.email,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  // 게시글 상세 조회
  findOnePost = async (postId) => {
    //
    const onePost = await this.postRepository.fineOnePost(postId);

    return {
      postId: onePost.postId,
      userId: onePost.UserId,
      title: onePost.title,
      content: onePost.content,
      createdAt: onePost.createdAt,
      updatedAt: onePost.updatedAt,
    };
  };

  // 게시글 수정
  updatePost = async (postId, title, content) => {
    //
    const updatePostData = await this.postRepository.updatePost(
      postId,
      title,
      content
    );

    return {
      postId: updatePostData.postId,
      title: updatePostData.title,
      content: updatePostData.content,
      createdAt: updatePostData.createdAt,
      updatedAt: updatePostData.updatedAt,
    };
  };

  // 게시글 삭제
  deletePost = async (postId) => {
    await this.postRepository.deletePost(postId);
    return;
  };
}

module.exports = PostService;
