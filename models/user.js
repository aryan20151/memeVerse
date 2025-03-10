import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, default: ".g!o@o#g#l$e.l!o@g@i@n."},
  profilePic: { type: String, default: "/default-avatar.png" },
  uploadedMemes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meme" }],
  likedMemes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Meme" }],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
