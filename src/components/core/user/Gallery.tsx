"use client";
import { getAllImages } from "@/services/operations/imageApis";
import useAuthStore from "@/store/authStore";
import useUserStore from "@/store/userStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};

const Gallery = (props: Props) => {
  const [images, setImages] = useState<any>();
  const { loading, setLoading, reload } = useUserStore((state) => state);

  useEffect(() => {
    (async () => {
      const res = await getAllImages(setLoading);
      setImages(res);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);
  return (
    <div className="w-full justify-center items-center text-center">
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {images?.length > 0 ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 place-content-center place-items-center">
              {images?.map((image: any, idx: number) => (
                <Image
                  width={200}
                  height={100}
                  className="rounded-lg object-cover"
                  src={image?.link}
                  alt={image?.name}
                  key={idx}
                  placeholder="blur"
                  blurDataURL={image?.link}
                />
              ))}
            </div>
          ) : (
            <div className=" text-6xl text-pink-400 font-bold">
              No Image Found
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Gallery;
