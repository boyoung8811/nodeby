import byUser from "../models/user";
import bcrypt from "bcrypt";


export const getJoin = (req,res) => 
    res.render("join", {pageTitle: "Join"});

export const postJoin = async (req,res) => {
    const { email,
        username,
        password,
        password2,
        name,
        location } = req.body;

    const pageTitle = "join";

    if(password !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "password confirmation does not match",
        });
    }

    const exists = await byUser.exists({ $or: [{ username}, {email}] });
    if(exists){
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken",
        });
    }
    
    try {
        await byUser.create({
            email,
            username,
            password,
            password2,
            name,
            location,
        })
        return res.redirect("/login");
    } catch(error) {
        return res.status(400).render("join", { pageTitle: "join", errorMessage: error.message, });
    }
};

export const handleEdit = (req,res) => res.render("useredit");
export const handleRemove = (req,res) => res.send("Remove");
export const getLogin = (req,res) => res.render("login", {pageTitle: "Login"});

export const postLogin = async (req,res) => {
    const { username,password} = req.body;
    const pageTitle = "Login";
    const user= await byUser.findOne({ username })
    if(!user){
        return res.status(400).render("login", 
        {pageTitle,errorMessage: "An account with this username does not exists"});
    };
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", 
        {pageTitle,errorMessage: "You worng password"});
    }
    req.session.loggedIn = true;
    req.session.user = user;
    
    return res.redirect("/");
}

export const logout = (req,res) => res.send("logout");
export const see = (req,res) => res.send("see");