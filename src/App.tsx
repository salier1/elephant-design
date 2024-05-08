import React from "react";
import { TabItem, Tabs } from "./components/Tabs";
function App() {
  return (
    <div className="App">
      <Tabs>
        <TabItem label="1">kakaka</TabItem>
        <TabItem label="2">jajaja</TabItem>
      </Tabs>

      <Tabs type="card">
        <TabItem label="1">kakaka</TabItem>
        <TabItem label="2">jajaja</TabItem>
      </Tabs>
    </div>
  );
}

export default App;
