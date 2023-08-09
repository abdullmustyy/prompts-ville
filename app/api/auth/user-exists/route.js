import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    await connectToDB();

    const { email } = await request.json();
    console.log(email);

    const user = User.exists({ email });
    console.log(user._id);

    return NextResponse.json({ user });
  } catch (error) {
    console.log("Error while checking if user exists: ", error);
  }
};
