import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-amber-800">Vite + React</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </>
  );
};

export default App;
