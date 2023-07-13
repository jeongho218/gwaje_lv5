const UserRepository = require("../repositories/01_user_repository");

class UserService {
  userRepository = new UserRepository();

  // email 조회
  findOneUser = async (email) => {
    const oneUser = await this.userRepository.findOneUser(email);

    return oneUser;
  };

  // 회원 가입
  createUser = async (email, password) => {
    const createUserData = await this.userRepository.createUser(
      email,
      password
    );

    return {
      email: createUserData.email,
      createdAt: createUserData.createdAt,
    };
  };
}

module.exports = UserService;
