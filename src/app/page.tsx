"use client";
import { ModeToggle } from "@/components/common/ModeToggle";
import Gallery from "@/components/core/user/Gallery";
import UploadImage from "@/components/core/user/UploadImage";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-y-5 p-3 mx-auto sm:p-24">
      <ModeToggle/>
      <UploadImage/>
      <Gallery/>
    </main>
  );
}
