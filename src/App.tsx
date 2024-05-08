import React from "react";
import { Menuitem, Menu, Submenu } from "./components/Menu";
import Button from "./components/Button";
function App() {
  const handleClick = (index: string) => {
    console.log(index);
  };
  return (
    <div className="App">
      <Menu mode="vertical" onSelect={(index) => handleClick(index)}>
        <Submenu title="1">
          <Menuitem>1</Menuitem>
          <Menuitem>2</Menuitem>
          <Menuitem>3</Menuitem>
        </Submenu>
      </Menu>
      <Button>nihao</Button>
    </div>
  );
}

export default App;
