import { connect } from "@/dbConfig/dbConfig";
import OTP from "@/models/otpModel";
import otpGenerator from "otp-generator";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    //Validation
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide email",
        },
        { status: 400 }
      );
    }

    // console.log(reqBody);

    // Count the number of OTPs sent within the last hour for the given email
    const countWithinLastHour = await OTP.aggregate([
      {
        $match: {
          email,
          createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) }, // Within the last hour
        },
      },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);
    // console.log(countWithinLastHour)
    const numberOfOTPsSent =
      countWithinLastHour.length > 0 ? countWithinLastHour[0].count : 0;
    // console.log(numberOfOTPsSent)

    if (numberOfOTPsSent >= 6) {
      return NextResponse.json(
        {
          success: false,
          message: "OTP Limit Exceeded",
        },
        { status: 400 }
      );
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    return NextResponse.json(
      {
        success: true,
        message: `OTP Sent Successfully`,
        data:otpBody
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("ERROR IN SENDING OTP: ",error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
