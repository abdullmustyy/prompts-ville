import { NextResponse } from "next/server";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const user = await User.findById(params.id).select("-password");

    if (!user)
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const PATCH = async (request, { params }) => {
  const { displayName, userName } = await request.json();

  try {
    await connectToDB();

    const existingUser = await User.findById(params.id);

    if (!existingUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    existingUser.displayName = displayName;
    existingUser.userName = userName;

    await existingUser.save();

    return NextResponse.json(
      { message: "Successfully updated the user" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error Updating User" }, { status: 500 });
  }
};
