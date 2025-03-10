import mongoose from "mongoose";

const LeaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalLikes: { type: Number, default: 0 },
  totalUploads: { type: Number, default: 0 }
});

const Leaderboard = mongoose.models.Leaderboard || mongoose.model("Leaderboard", LeaderboardSchema);
export default Leaderboard;
