import express from "express";
import { handleEdit,logout,see,startGithubLogin,finishGithubLogin} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", handleEdit);

userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get(":id", see);

export default userRouter;