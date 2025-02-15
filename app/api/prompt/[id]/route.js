import Prompt from "@backend/models/prompt";
import { connectToDB } from "@backend/utils/database";
import { ObjectId } from "mongodb";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export const GET = async (request, props) => {
  const params = await props.params;
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate({
      path: "creator",
      select: "-password",
    });
    if (!prompt) return new Response("Prompt Not Found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (request, props) => {
  const params = await props.params;
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

export const DELETE = async (request, props) => {
  const params = await props.params;
  const session = await getServerSession(authOptions);

  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Prompt.deleteOne({ _id: params.id });
    const prompts = await Prompt.find({
      creator: new ObjectId(session?.user.id),
    }).populate({
      path: "creator",
      select: "-password",
    });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
