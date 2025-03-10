import { NextResponse } from "next/server";
import Meme from "@/models/meme";
import connectToDB from "@/lib/db";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 5; // Number of memes per request
    const skip = (page - 1) * limit;

    const memes = await Meme.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("uploader", "username profilePic");

    const totalMemes = await Meme.countDocuments();
    const nextPage = skip + limit < totalMemes ? page + 1 : null;

    return NextResponse.json({ memes, nextPage });
  } catch (error) {
    console.error("Error fetching memes:", error);
    return NextResponse.json({ error: "Failed to fetch memes" }, { status: 500 });
  }
}
