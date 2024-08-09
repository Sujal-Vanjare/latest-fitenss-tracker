import UserProfile from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="p-5 flex items-center justify-center h-[calc(100vh-56px)] lg:h-[calc(100vh-60px)] flex-col">
      <h1 className="text-4xl">Welcome to Fitness Tracker</h1>
      <Link href="/installation">
        <Button variant={"link"}>Docs</Button>
      </Link>
    </div>
  );
}
