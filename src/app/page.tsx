import { auth } from "@/auth.config";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  
  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen overflow-hidden pb-10 gap-8">
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight font-bold">
        Realtime Notification System
      </h1>
      <Link
        className={cn(
          buttonVariants(),
          "text-xl sm:text-2xl md:text-3xl lg:text-4xl py-4 sm:py-6 md:py-8 lg:px-10 rounded-full"
        )}
        href={session ? "/ping" : "/api/auth/signin"}
      >
        Get Started
      </Link>
    </main>
  );
}
