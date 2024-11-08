import { MasonInterfaceRoot } from "@mason/interface";
import { useRef } from "react";

function App() {
  const domEl = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={domEl}
      id="App"
      style={{
        height: "100%",
      }}
    >
      <MasonInterfaceRoot />
    </div>
  );
}

export default App;
