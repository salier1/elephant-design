/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Menu, { MenuProps } from "./Menu";
import MenuItem from "./Menuitem";
import { Submenu } from "./submenu";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
  mode: "vertical",
  defaultOpenSub: ["4"],
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <Submenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </Submenu>
      <Submenu title="opened">
        <MenuItem>opened1</MenuItem>
      </Submenu>
    </Menu>
  );
};
const createStyleFile = () => {
  const cssFile: string = `
  .menu-submenu{
    display:none;
  }
  .menu-submenu.menu-opened{
    display:block;
  }
  `;
  return <style>{cssFile}</style>;
};
let menuElement: HTMLElement, activeElement: HTMLElement, disabledElements: HTMLElement, subMn: HTMLElement;
describe("test Menu and Menuitem components", () => {
  beforeEach(() => {
    render(generateMenu(testProps));
    render(createStyleFile());
    menuElement = screen.getByTestId("test-menu");
    activeElement = screen.getByText("active");
    disabledElements = screen.getByText("disabled");
    subMn = screen.getByText("dropdown");
  });
  it("should render corrent Menu and Menuitem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu test");
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElements).toHaveClass("menu-item is-disabled");
  });
  it("click item should change active and call the right callback", () => {
    const thirdItem = screen.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledTimes(1);
    fireEvent.click(disabledElements);
    expect(disabledElements).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledTimes(1);
  });

  it("should show dropdown items when hover on submenu", async () => {
    expect(screen.queryByText("drop1")).not.toBeInTheDocument();
    fireEvent.mouseEnter(subMn);
    await waitFor(() => {
      expect(screen.getByText("drop1")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("drop1"));
    expect(testProps.onSelect).toHaveBeenCalledTimes(1);
    fireEvent.mouseLeave(subMn);
    await waitFor(() => {
      expect(screen.queryByText("drop1")).not.toBeInTheDocument();
    });
  });
});
describe("test Vertical Menu and Menuitem components", () => {
  beforeEach(() => {
    render(generateMenu(testVerProps));
    render(createStyleFile());
    menuElement = screen.getByTestId("test-menu");
    activeElement = screen.getByText("active");
    disabledElements = screen.getByText("disabled");
    subMn = screen.getByText("dropdown");
  });

  it("should render vertical mode when it set to vertical", () => {
    menuElement = screen.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
  it("should show dropdown items when hover on submenu", async () => {
    expect(screen.queryByText("drop1")).not.toBeInTheDocument();
    fireEvent.click(subMn);
    await waitFor(() => {
      expect(screen.getByText("drop1")).toBeInTheDocument();
    });

    // fireEvent.click(screen.getByText("opened1"));
    // expect(testProps.onSelect).toHaveBeenCalledTimes(1);

    fireEvent.click(subMn);
    await waitFor(() => {
      expect(screen.queryByText("drop1")).not.toBeInTheDocument();
    });
  });
  it("should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index", async () => {
    expect(screen.queryByText("opened1")).toBeVisible();
  });
});
