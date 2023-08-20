import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  try {
    await connectToDB();

    const { userName, displayName, email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      userName,
      displayName,
      email,
      password: hashedPassword,
      image:
        "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
    });

    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
};
