import User from "@backend/models/user";
import { connectToDB } from "@backend/utils/database";
import { NextResponse } from "next/server";

export const PATCH = async (request, { params }) => {
  const { image } = await request.json();

  try {
    await connectToDB();

    const existingUser = await User.findById(params.id);

    if (!existingUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    existingUser.image = image;

    existingUser.save();

    return NextResponse.json(
      { message: "Successfully updated the user image" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Error Updating User" }, { status: 500 });
  }
};
