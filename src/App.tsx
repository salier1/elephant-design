import React from "react";
import { Menu, Menuitem } from "./components/Menu";
import { selectCallback } from "./components/Menu/Menu";
import { SubMenu } from "./components/Menu/submenu";
function App() {
  const handy: selectCallback = (index: number) => {
    console.log(index);
  };

  return (
    <div className="App">
      <Menu onSelect={handy} mode="horizontal">
        <Menuitem>item1</Menuitem>
        <Menuitem>item2</Menuitem>
        <SubMenu title="item3">
          <Menuitem>sub1</Menuitem>
          <Menuitem>sub2</Menuitem>
          <Menuitem>sub3</Menuitem>
        </SubMenu>
      </Menu>
      <Menu onSelect={handy} mode="vertical">
        <Menuitem>item1</Menuitem>
        <Menuitem>item2</Menuitem>
        <SubMenu title="item3">
          <Menuitem>sub1</Menuitem>
          <Menuitem>sub2</Menuitem>
          <Menuitem>sub3</Menuitem>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default App;
