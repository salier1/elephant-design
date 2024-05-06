import React from "react";
import { Menu, Menuitem } from "./components/Menu";
function App() {
  return (
    <div className="App">
      <Menu>
        <Menuitem>1</Menuitem>
        <Menuitem>2</Menuitem>
        <Menuitem>3</Menuitem>
      </Menu>
    </div>
  );
}

export default App;
