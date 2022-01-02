import movieModel from "../models/video";

/*
console.log("start")
movieModel.find({}, (error, videos) => {
  if(error) {
    return res.render("sever-error")
  }
  return res.render("home", { pageTitle: "Home", videos});
});
console.log("finished")
*/

/*
const videos = await movieModel.find({});
  return res.render("home", { pageTitle: "Home", videos });
  */

  export const home = async (req, res) => {
    const videos = await movieModel.find({});
    return res.render("home", { pageTitle: "Home", videos });
  };

export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching` });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { hello } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  return res.redirect("/");
};
