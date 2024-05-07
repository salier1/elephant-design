/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { render, screen } from "@testing-library/react";
import Menu, { MenuProps } from "./Menu";
import MenuItem, { MenuItemProps } from "./Menuitem";

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
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index="0">active</MenuItem>
      <MenuItem index="1" disabled>
        disabled
      </MenuItem>
      <MenuItem index="2">xyz</MenuItem>
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
  });
  it("click item should change active and call the right callback", () => {});
  it("should render vertical mode when it set to vertical", () => {});
});
