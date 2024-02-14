import { connect } from "@/dbConfig/dbConfig";
import { verifyAuth } from "@/helpers/verifyAuth";
import Image from "@/models/imageModel";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { generateSlug } from "random-word-slugs";

const f = createUploadthing();

const auth = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value || "";
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

  const id = verifyUser?.id;
  return id;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      connect();
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url: ", file);
      const randomName = generateSlug(4, { format: "title" });
      const existName = await Image.findOne({ name: file.name });
      let imageUplaod;
      if (existName) {
        imageUplaod = await Image.create({
          userId: metadata.userId,
          link: file.url,
          name: randomName,
        });
      } else {
        imageUplaod = await Image.create({
          userId: metadata.userId,
          link: file.url,
          name: file.name,
        });
      }

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
