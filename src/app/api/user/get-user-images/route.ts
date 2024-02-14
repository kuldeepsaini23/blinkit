import { connect } from "@/dbConfig/dbConfig";
import { verifyAuth } from "@/helpers/verifyAuth";
import Image from "@/models/imageModel";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(request: NextRequest) {
  try {
    // console.log("REQUEST: ", request);
    const token = request.cookies.get("token")?.value || "";
   

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token not present in cookies" },
        { status: 400 }
      );
    }
 
    const verifyUser = (await verifyAuth(token)) as JwtPayload;
    if (verifyUser?.error) {
      return NextResponse.json(
        { success: false, error: verifyUser.message },
        { status: 400 }
      );
    }



    // Validation Data
    if (!verifyUser.id) {
      return NextResponse.json(
        { message: "All fields are required.", success: false },
        { status: 400 }
      );
    }

    // console.log(verifyUser.id)
    
    // Finding images corresponding to user in DB
    const images = await Image.find({
      userId:verifyUser.id
    })
    // console.log(images)
    if (images.length === 0) {
      return NextResponse.json(
        { success: true, message: "No Image Exist" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `All Images`,
        data: images, // Returning the user data
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
