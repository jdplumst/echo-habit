import { Button } from "@/components/ui/button";

export default function Timer() {
  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center">
      <div>Timer</div>
      <div className="flex gap-2">
        <Button>Start</Button>
        <Button>Stop</Button>
        <Button>Reset</Button>
      </div>
    </div>
  );
}
