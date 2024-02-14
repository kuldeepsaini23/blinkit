import NavBar from "@/components/common/NavBar";
import Gallery from "@/components/core/user/Gallery";
import UploadImage from "@/components/core/user/UploadImage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "The Home Page",
  
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-y-2 sm:gap-y-8 p-4 pb-10 mx-auto sm:p-24">
      <NavBar/>
      <UploadImage/>
      <Gallery/>
    </main>
  );
}
