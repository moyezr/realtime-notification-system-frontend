"use client";

import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <Button
      onClick={async (formData) => {
        await signOut({
          redirect: true,
          callbackUrl: "/",
        });
      }}
      variant={"secondary"}
      className="md:text-lg flex items-center justify-center ml-auto"
    >
      Sign Out <LogOut />
    </Button>
  );
};

export default SignOutButton;
