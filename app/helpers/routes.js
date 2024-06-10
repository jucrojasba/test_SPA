import { NotFoundScene } from "../scenes/public/notFound/not-found";
import { LoginScene } from "../scenes/public/login/login";
import { RegisterScene } from "../scenes/public/register/register";
export const routes = {
  public: [
    { path: "/not-found", scene: NotFoundScene },
    { path: "/login", scene: LoginScene },
    { path: "/register", scene: RegisterScene },
  ],
  private: [],
};
