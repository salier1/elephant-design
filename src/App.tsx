import React, { useState } from "react";
import { Menu, Menuitem } from "./components/Menu";
import { selectCallback } from "./components/Menu/Menu";
function App() {
  const handy: selectCallback = (index: string) => {
    console.log(index);
  };

  return (
    <div className="App">
      <Menu onSelect={handy} mode="vertical">
        <Menuitem index="1">item1</Menuitem>
        <Menuitem index="2">item2</Menuitem>
        <Menuitem index="3">item3</Menuitem>
      </Menu>
      <Menu onSelect={handy} mode="horizontal">
        <Menuitem index="1">item1</Menuitem>
        <Menuitem index="2">item2</Menuitem>
        <Menuitem index="3">item3</Menuitem>
      </Menu>
    </div>
  );
}

export default App;
