import exrpess from "express";
import { join, login} from "../controllers/usercontroller";
import { home } from "../controllers/videocontroller";

const globalRouter = exrpess.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);


export default globalRouter;