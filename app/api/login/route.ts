import { connectionDb, User } from "@/server/db";
import { hashPassword } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }
    await connectionDb();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }
    const pwd = await hashPassword(password);
    const newUser = new User({ email, password: pwd });

    await newUser.save();

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in login API:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
