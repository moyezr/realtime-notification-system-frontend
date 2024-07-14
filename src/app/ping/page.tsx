"use server";
import SignOutButton from "@/components/signout-button";

import React from "react";

import { auth } from "@/auth.config";
import PingBoard from "@/components/ping-board";

type Props = {};

const PingPage = async (props: Props) => {
  const session = await auth();

  return (
    <div className="px-8 sm:px-16 md:px-24 lg:px-32 pt-8">
      <header className="w-full">
        <SignOutButton />
      </header>
      <main>
        <h3 className="font-bold text-xl sm:text-2xl md:text-3xl mb-10">
          Active Users
        </h3>
        <PingBoard session={session} />
      </main>
    </div>
  );
};

export default PingPage;
