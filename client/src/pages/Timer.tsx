import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useEffect, useRef, useState } from "react";

const FOCUS_TIME = 1500;
const BREAK_TIME = 600;

export default function Timer() {
  useDocumentTitle("Timer");

  const [time, setTime] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"focus" | "break">("focus");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setIsRunning(false);
            if (mode === "focus") {
              setMode("break");
              return BREAK_TIME;
            } else {
              setMode("focus");
              return FOCUS_TIME;
            }
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, mode]);

  function start() {
    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setIsRunning(false);
    if (mode === "focus") {
      setTime(FOCUS_TIME);
    } else {
      setTime(BREAK_TIME);
    }
  }

  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center gap-4">
      <div className="text-3xl font-bold">
        {`${Math.floor(time / 60)}`.padStart(2, "0")}:
        {`${Math.floor(time % 60)}`.padStart(2, "0")}
      </div>
      <div className="flex gap-2">
        <Button onClick={start}>Start</Button>
        <Button onClick={stop}>Stop</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}
