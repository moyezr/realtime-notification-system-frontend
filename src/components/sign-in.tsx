"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "./ui/button";
export function SignInButton() {
  return (
    <Button
      className="text-xl sm:text-2xl md:text-3xl flex items-center justify-center mb-10 p-10 rounded-full gap-4 md:gap-6"
      onClick={() =>
        signIn("google", {
          callbackUrl: "/ping",
        })
      }
    >
      {" "}
      <Image src={"/google.webp"} width={225} height={225} className="w-10 h-10 rounded-full" alt="Google Logo" />
      Sign in with Google
    </Button>
  );
}
