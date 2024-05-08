import React from "react";
import { Menuitem, Menu, Submenu } from "./components/Menu";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

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
    </div>
  );
}

export default App;
