import React from "react";
import Upload from "./components/Upload";

function App() {
  return (
    <div className="App">
      <Upload action="https://jsonplaceholder.typicode.com/posts"></Upload>
    </div>
  );
}

export default App;
