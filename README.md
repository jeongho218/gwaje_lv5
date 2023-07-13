1. ERD
   ![ERD](https://github.com/jeongho218/gwaje_lv4/assets/82637024/c4e37713-327c-43cd-be78-8cc3317acab9)

2. /config 폴더 제외됨

3. Project Tree

```
LV.5
├─ .gitignore
├─ app.js
├─ controllers
│  ├─ 01_user_controller.js
│  ├─ 02_post_controller.js
│  ├─ 03_comment_controller.js
│  └─ 04_like_controller.js
├─ middlewares
│  └─ auth-middleware.js
├─ migrations
│  ├─ 20230709051458-create-users.js
│  ├─ 20230709051603-create-posts.js
│  ├─ 20230709051642-create-comments.js
│  └─ 20230709051821-create-likes.js
├─ models
│  ├─ comments.js
│  ├─ index.js
│  ├─ likes.js
│  ├─ posts.js
│  └─ users.js
├─ package-lock.json
├─ package.json
├─ README.md
├─ repositories
│  ├─ 01_user_repository.js
│  ├─ 02_post_repository.js
│  ├─ 03_comment_repository.js
│  └─ 04_like_repository.js
└─ services
   ├─ 01_user_service.js
   ├─ 02_post_service.js
   ├─ 03_comment_service.js
   └─ 04_like_service.js

```
