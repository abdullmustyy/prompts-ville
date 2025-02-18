import Prompt from "@backend/models/prompt";
import { connectToDB } from "@backend/utils/database";

export const GET = async (request, props) => {
  const params = await props.params;
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate({
      path: "creator",
      select: "-password",
    });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
};
