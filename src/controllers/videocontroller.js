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

  export const home = async (req, res) => {
    const videos = await movieModel.find({});
    return res.render("home", { pageTitle: "Home", videos });
  };

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await movieModel.findById(id);
  if(video){
    return res.render("watch", { pageTitle: video.title, video});
  }
  return res.render("404", {pageTitle: "Video not found"});
    
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

export const postUpload = async (req, res) => {
  const { title,description,hashtags } = req.body;
  try {
    await movieModel.create ({
    title,
    description,
    hashtags: hashtags.split(",").map(word => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  return res.redirect("/");
} catch(error) {
  console.log(error);
  return res.render("upload", { pageTitle: "Upload Video", errorMessage: error.message, });
}
};
