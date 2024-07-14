"use client";

import { SignInButton } from "@/components/sign-in";
import React from "react";

type Props = {};

const LogInPage = (props: Props) => {
  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <SignInButton />
    </main>
  );
};

export default LogInPage;
