import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nicename: { type: String, required: true, unique: true },
    socialOnly: { type: Boolean, default: false },
    password: { type: String },
});

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 5);
});

const kakaoUser = mongoose.model("user", userSchema);

export default kakaoUser