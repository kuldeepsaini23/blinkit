import { connect } from "@/dbConfig/dbConfig";
import { verifyAuth } from "@/helpers/verifyAuth";
import User from "@/models/userModel";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    // console.log("TOKEN: ", token);

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token not present in cookies" },
        { status: 400 }
      );
    }

    const verifyUser = (await verifyAuth(token)) as JwtPayload;
    if (verifyUser?.error) {
      return NextResponse.json(
        { success: false, message: verifyUser.message },
        { status: 400 }
      );
    }

    const id = verifyUser.id;

    // Validation Data
    if (!id) {
      return NextResponse.json(
        { message: "All fields are required.", success: false },
        { status: 400 }
      );
    }

    // Finding user in DB
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User does not exist, retry" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `User Details`,
        data: user, // Returning the user data
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error in User Details: ", error.message);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Error in User Details",
      },
      { status: 500 }
    );
  }
}
