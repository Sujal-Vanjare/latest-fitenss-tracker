"use client";
import SignIn from "@/components/auth/signin";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <SignIn />
      </Suspense>
    </div>
  );
}
