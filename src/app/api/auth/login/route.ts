import { connect } from "@/dbConfig/dbConfig";
import { tokenGenration } from "@/helpers/tokenGenration";
import OTP from "@/models/otpModel";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, otp } = reqBody;
    console.log("REQ BODY: ", reqBody);
    //Validation
    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide email",
        },
        { status: 400 }
      );
    }

    // Check if the OTP is valid
    const otpResponse = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    // console.log("OTP RESPONSE: ", otpResponse);
    if (otpResponse.length === 0) {
      // OTP not found for the email
      return NextResponse.json(
        {
          success: false,
          message: "No OTP Exist",
        },
        {
          status: 400,
        }
      );
    } else if (otp !== otpResponse[0].otp) {
      // Invalid OTP
      return NextResponse.json(
        {
          success: false,
          message: "The OTP is not valid",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    // console.log("USER: ", user);
    if (user) {
      const { token, options } = tokenGenration(user);
      const response = NextResponse.json(
        {
          success: true,
          token,
          user: user,
          message: `User Login Success`,
        },
        {
          status: 200,
        }
      );

      response.cookies.set("token", token, options);
      response.cookies.set("verified", "true", options);
      return response;
    }

    // Create a new user instance
    const newUser = new User({
      email,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    const { token, options } = tokenGenration(savedUser);
    const response = NextResponse.json(
      {
        success: true,
        token,
        user: savedUser,
        message: `User Login Success`,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("token", token, options);
    response.cookies.set("verified", "false", options);
    return response;
  } catch (error: any) {
    console.log("ERROR IN LOGIN USER: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
