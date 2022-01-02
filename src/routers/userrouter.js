import express from "express";
import { handleEdit,handleRemove,logout,see} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);

userRouter.get("/edit", handleEdit);
userRouter.get("/delete", handleRemove);
userRouter.get(":id", see);

export default userRouter;