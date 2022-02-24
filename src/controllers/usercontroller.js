import byUser from "../models/user";
import fetch from "cross-fetch";
import bcrypt from "bcrypt";
import { redirect } from "express/lib/response";


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
export const getLogin = (req,res) => res.render("login", {pageTitle: "Login"});

export const postLogin = async (req,res) => {
    const { username,password} = req.body;
    const pageTitle = "Login";
    const user= await byUser.findOne({ username, socialOnly:false });
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

export const startGithubLogin =(req,res) => {
    const baseUrl = "https://github.com/login/oauth/authorize"
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup:false,
        scope:"read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req,res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
        method:"post",
        headers: {
            Accept: "application/json",
        },
        })
    ).json();
    if ("access_token" in tokenRequest) {
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`
            }
        }
        )).json();
        console.log(userData);
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`
            }
        }
    )).json();
    const emailObj = emailData.find(
        (email) => email.primary === true && email.verified === true
    );
    if(!emailObj){
        return res.redirect("/login");
    }
    let user = await byUser.findOne({ email: emailObj.email });
    if(!user){
        user = await byUser.create({
            email: emailObj.email,
            avatar_Url: userData.avatar_url,
            username: userData.login,
            password:"",
            socialOnly: true,
            name: userData.name,
            location: userData.location,
        });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};

export const logout = (req,res) => {
    req.session.destroy();
    return res.redirect("/");
}
export const see = (req,res) => res.send("see");