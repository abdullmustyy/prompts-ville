import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

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
    });

    return NextResponse.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
};
