"use client";
import Register from "@/components/auth/register";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Register />
      </Suspense>
    </div>
  );
}
