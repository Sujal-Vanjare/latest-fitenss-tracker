import useUser from "@/hook/useUser";
import { cn } from "@/lib/utils";
import { CircleUser } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Avatar() {
  const { data, isFetching } = useUser();
  const imageUrl = data?.user_metadata?.avatar_url;

  return (
    <>
      {data?.aud ? (
        <div
          className={cn(
            " transition-all w-9 h-9",
            isFetching ? "opacity-0 translate-y-2" : "opacity-1 translate-y-0"
          )}
        >
          {!imageUrl ? (
            <div className=" border w-9 h-9 grid place-content-center rounded-full hover:scale-105 transition-all">
              <p className="text-4xl -translate-y-1">{data?.email?.[0]}</p>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt="User Profile Image"
              width={50}
              height={50}
              className={cn(
                " rounded-full border p-1 hover:scale-105 transition-all duration-500",
                isFetching
                  ? "opacity-0 translate-y-2"
                  : "opacity-1 translate-y-0"
              )}
            />
          )}
        </div>
      ) : (
        <div className=" border w-9 h-9 grid place-content-center rounded-full hover:scale-105 transition-all">
          <CircleUser className="h-5 w-5" />
        </div>
      )}
    </>
  );
}
