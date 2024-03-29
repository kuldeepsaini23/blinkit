import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { verifyAuth } from "@/helpers/verifyAuth";
import { JwtPayload } from "jsonwebtoken";
import { connect } from "@/dbConfig/dbConfig";

connect();
export async function POST(request: NextRequest) {
  try {
    //getting data from req body

    const reqBody = await request.json();
    // console.log("REQ BODY: ", request);

    const token = request.cookies.get("token")?.value || "";
    // console.log("TOKEN: ", token);

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token not present in cookies" },
        { status: 400 }
      );
    }

    // Destructuring data from req body
    const { name, address, phoneNumberExt, phoneNumber } = reqBody;
    // console.log("REQ BODY: ", reqBody);

    if (!name || !address || !phoneNumberExt || !phoneNumber) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    const user = (await verifyAuth(token)) as JwtPayload;
    if (user?.error) {
      return NextResponse.json(
        { success: false, error: user.message },
        { status: 400 }
      );
    }

    // console.log("USER ID: ", user);

    const PhoneNoCheck = await User.findOne({ phoneNumber });
    if (PhoneNoCheck) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone No. Already Exists",
        },
        {
          status: 400,
        }
      );
    }
    console.log("Phone check: ", PhoneNoCheck);

    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }

    existingUser.name = name;
    existingUser.address = address;
    existingUser.phoneNumberExt = phoneNumberExt;
    existingUser.phoneNumber = phoneNumber;
    existingUser.verified = true;
    const updatedUser = await existingUser.save();

    console.log("ON BROADING USER: ", updatedUser);
    

    const response =  NextResponse.json(
      {
        success: true,
        message: `User Signed up`,
        user: updatedUser,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("verified", "true", {
      expires: new Date(Date.now() +24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log("ERROR IN ON BOARDING>>", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: "Error in filling details",
      },
      { status: 500 }
    );
  }
}
