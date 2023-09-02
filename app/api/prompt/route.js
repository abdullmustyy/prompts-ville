import Prompt from "@backend/models/prompt";
import { connectToDB } from "@backend/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate({
      path: "creator",
      select: "-password",
    });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
