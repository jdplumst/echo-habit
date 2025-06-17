import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen min-w-screen flex-col items-center justify-center">
      <div>Timer</div>
      <div className="flex gap-2">
        <button>Start</button>
        <button>Stop</button>
        <button>Reset</button>
      </div>
    </div>
  );
}

export default App;
