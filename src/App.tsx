import React, { useEffect, useState } from "react";

function App() {
  const [nihao, nnihao] = useState(10);

  useEffect(() => {
    nnihao(10);
    console.log(nihao);
  }, [nihao]);
  return (
    <div className="App">
      {nihao}
      <button
        onClick={() => {
          nnihao(nihao);
        }}>
        haha
      </button>
    </div>
  );
}

export default App;
