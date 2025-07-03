import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: String,
  picture: String,
  role: {
    type: String,
    enum: ["admin", "moderator", "user"],
    default: "user",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
