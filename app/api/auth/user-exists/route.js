import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connectToDB();

    const { email } = await request.json();

    const user = await User.exists({ email });

    return NextResponse.json({ user });
  } catch (error) {
    console.log("Error while checking if user exists: ", error);
  }
};
