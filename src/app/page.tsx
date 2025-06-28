/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { useEffect, useState } from "react";
import { SignIn } from "~/components/sign-in";

export default function Home() {
  const [text, setText] = useState("loading");

  const fetchData = async () => {
    const res = await fetch("/api/hello");
    const data = await res.json();

    setText(data.message);
  };

  useEffect(() => {
    void fetchData();
  }, []);
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center gap-14 bg-gradient-to-b from-[#00D4FF] to-[#090979] p-8">
      <h1 className="text-center text-7xl font-bold">Echo Habit</h1>
      <h2 className="text-center text-xl font-semibold">
        Start being more productive using pomodoro technique and track your
        progress!
      </h2>
      <SignIn />
      <div>{text}</div>
    </div>
  );
}
