import Mongoose from "mongoose";

const videoSchema = new Mongoose.Schema({
  title: String,
  description: String,
  createAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const movieModel = Mongoose.model("Video", videoSchema);

export default movieModel;
