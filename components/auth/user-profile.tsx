"use client";
import React, { useTransition } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { IoMdSettings } from "react-icons/io";
import { PiSignInFill, PiSignOutFill } from "react-icons/pi";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useUser from "@/app/hook/useUser";
import ManageProfile from "./manage-profile";
import Avatar from "./avatar";
import Link from "next/link";
import { MdOutlineCreate } from "react-icons/md";

export default function UserProfile() {
  const [isSignOut, startSignOut] = useTransition();
  const router = useRouter();
  const { data } = useUser();

  const signout = () => {
    startSignOut(async () => {
      const supabase = createSupabaseBrowser();
      await supabase.auth.signOut();
      router.push("/signin");
    });
  };

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger>
          <Avatar />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[90vw] sm:w-[30rem]">
          <div
            className={cn("flex gap-5 items-start w-[90vw] sm:w-full", {
              "animate-pulse": isSignOut,
            })}
          >
            <div className="w-10">
              <Avatar />
            </div>
            <div className="space-y-5 w-full flex-1">
              <div>
                <h1>
                  {data?.aud
                    ? data?.email
                    : "Sign in or Register your account first"}
                  {}
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full pr-3 sm:pr-0">
                {data?.aud ? (
                  <Button
                    className="w-fit sm:w-1/2 h-9  rounded-xl flex items-center justify-center gap-2 text-gray-600 dark:text-gray-200 text-sm"
                    variant="outline"
                    onClick={() => {
                      document.getElementById("manage-profile")?.click();
                    }}
                  >
                    <IoMdSettings className="size-5" />
                    Manage Account
                  </Button>
                ) : (
                  <Button
                    className="w-fit sm:w-1/2  h-9  rounded-xl  text-gray-600 dark:text-gray-200 text-sm"
                    variant="outline"
                  >
                    <Link
                      href="/register"
                      className="flex items-center justify-center gap-2"
                    >
                      <MdOutlineCreate className="size-5" />
                      Register
                    </Link>
                  </Button>
                )}

                {data?.aud ? (
                  <Button
                    className="w-fit sm:w-1/2  h-9  rounded-xl flex items-center justify-center gap-2 text-gray-600 dark:text-gray-200 text-sm"
                    variant="outline"
                    onClick={signout}
                  >
                    {!isSignOut ? (
                      <PiSignOutFill className="size-5" />
                    ) : (
                      <AiOutlineLoading3Quarters className="size-4 animate-spin" />
                    )}
                    SignOut
                  </Button>
                ) : (
                  <Button
                    className="w-fit sm:w-1/2  h-9  rounded-xl  text-gray-600 dark:text-gray-200 text-sm"
                    variant="outline"
                  >
                    <Link
                      href="/signin"
                      className="flex items-center justify-center gap-2"
                    >
                      <PiSignInFill className="size-5" />
                      Sign in
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <ManageProfile />
    </div>
  );
}
