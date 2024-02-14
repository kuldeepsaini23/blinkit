"use client";
import { UploadButton, UploadDropzone } from "@/lib/upload-thing";
import React from "react";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CloudFogIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { UploadCloud } from "lucide-react";

type Props = {};

const UploadImage = (props: Props) => {
  let toastId: any;
  return (
    <div className="w-full py-3 sm:px-0 flex justify-center items-center">
      <Card className="sm:w-[350px]">
        <CardHeader className="items-center">
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>
            Drag and drop your image here or click to upload.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
         
          <UploadButton
                endpoint="imageUploader"
                onUploadBegin={(progress) => {
                  toastId = toast.loading("Loading...");
                }}
          
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  toast.success("Upload Completed");
                  toast.dismiss(toastId);
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  toast.error(`ERROR! ${error.message}`);
                  toast.dismiss(toastId);
                }}
                
                className="cursor-pointer w-full h-40  rounded-lg items-center justify-center "
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadImage;
