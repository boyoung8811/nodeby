import Mongoose from "mongoose";

const videoSchema = new Mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 80 },
  description: { type: String, required: true, trim: true, minlength: 20 },
  createAt: { type: Date, required:true, default: Date.now },
  hashtags: [{ type: String, trim: true}],
  meta: {
    views: { type: Number, default: 0, required:true},
    rating: { type: Number, default: 0, required:true},
  },
});

videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const movieModel = Mongoose.model("Video", videoSchema);

export default movieModel;
