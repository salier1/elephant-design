/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Menu, { MenuProps } from "./Menu";
import MenuItem, { MenuItemProps } from "./Menuitem";

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: "test",
  mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
    </Menu>
  );
};
let menuElement: HTMLElement, activeElement: HTMLElement, disabledElements: HTMLElement;
describe("test Menu and Menuitem components", () => {
  beforeEach(() => {
    render(generateMenu(testProps));
    menuElement = screen.getByTestId("test-menu");
    activeElement = screen.getByText("active");
    disabledElements = screen.getByText("disabled");
  });
  it("should render corrent Menu and Menuitem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("menu test");
    // eslint-disable-next-line testing-library/no-node-access
    expect(menuElement.getElementsByTagName("li").length).toEqual(3);
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
  it("should render vertical mode when it set to vertical", () => {
    cleanup();
    render(generateMenu(testVerProps));
    menuElement = screen.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
});
