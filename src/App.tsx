import React from "react";
import { Menu, Menuitem } from "./components/Menu";
import { selectCallback } from "./components/Menu/Menu";
import { SubMenu } from "./components/Menu/submenu";
function App() {
  const handy: selectCallback = (index: string) => {
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
      <Menu onSelect={handy} mode="vertical" defaultOpenSub={["2"]}>
        <Menuitem>item1</Menuitem>
        <Menuitem>item2</Menuitem>
        <SubMenu title="item3">
          <Menuitem>sub1</Menuitem>
          <Menuitem>sub2</Menuitem>
          <Menuitem>sub3</Menuitem>
        </SubMenu>
        <SubMenu title="item4">
          <Menuitem>sub4</Menuitem>
          <Menuitem>sub5</Menuitem>
          <Menuitem>sub6</Menuitem>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default App;
