import Link from "next/link";
import { SignIn } from "~/components/sign-in";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center gap-4 bg-gradient-to-b from-[#00D4FF] to-[#090979] p-8">
      <h1 className="text-7xl font-bold">Echo Habit</h1>
      <h2 className="text-xl font-semibold">
        Start being more productive using pomodoro technique and track your
        progress!
      </h2>
      <Button>
        <Link href="/timer">Start tracking!</Link>
      </Button>
      <SignIn />
    </div>
  );
}
