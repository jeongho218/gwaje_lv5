const UserService = require("../services/01_user_service");
const jwt = require("jsonwebtoken");

class UsersController {
  userService = new UserService();

  // 회원 가입 API
  createUser = async (req, res) => {
    const { email, password, pwCheck } = req.body;

    const validEmailCheck = (string) => {
      const pattern = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[A-Za-z]+$/;
      return pattern.test(string);
    };

    if (!validEmailCheck(email) || email.length < 3) {
      return res
        .status(400)
        .json({ errorMessage: "닉네임의 형식이 올바르지 않습니다." });
    }

    if (!password || password < 4) {
      return res
        .status(412)
        .json({ errorMessage: "패스워드는 4자이상이어야 합니다." });
    }

    if (password !== pwCheck) {
      return res.status(412).json({
        errorMessage:
          "패스워드가 일치하지 않습니다. 패스워드 재입력은 pwCheck 입니다.",
      });
    }

    const isExistUser = await this.userService.findOneUser(email);
    if (isExistUser) {
      return res
        .status(412)
        .json({ errorMessage: "이미 존재하는 이메일입니다." });
    }

    try {
      console.log("try 안까지 들어옴");
      const createUserData = await this.userService.createUser(email, password);
      return res
        .status(201)
        .json({ data: createUserData, message: "회원가입이 완료되었습니다." });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ errorMessage: "회원 가입에 실패하였습니다." });
    }
  };

  // 로그인 API
  logIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await this.userService.findOneUser(email);

    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "해당하는 사용자가 존재하지 않습니다." });
    } else if (user.password !== password) {
      return res
        .status(401)
        .json({ errorMessage: "비밀번호가 일치하지 않습니다." });
    }

    try {
      // JWT 생성
      const token = jwt.sign(
        {
          userId: user.userId,
        },
        "customized_secret_key"
      );

      // 2. 쿠키 발급
      res.cookie("authorization", `Bearer ${token}`);

      // 3. response
      return res.status(200).json({ message: "로그인에 성공하였습니다." });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "로그인에 실패하였습니다." });
    }
    //
  };
}

module.exports = UsersController;
