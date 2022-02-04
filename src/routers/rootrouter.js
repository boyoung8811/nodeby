import exrpess from "express";
import { getJoin, postJoin, getLogin, postLogin} from "../controllers/usercontroller";
import { home,search } from "../controllers/videocontroller";

const rootRouter = exrpess.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);



export default rootRouter;