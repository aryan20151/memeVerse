import mongoose from "mongoose";

const MemeSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploaderName: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [{ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

const Meme = mongoose.models.Meme || mongoose.model("Meme", MemeSchema);
export default Meme;
