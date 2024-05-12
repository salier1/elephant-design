import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import { Input, InputProps } from "./Input";

const Props: InputProps = {
  onChange: jest.fn(),
  placeholder: "test-input",
};
describe("test Input component", () => {
  it("should render the correct default Input", () => {
    render(<Input {...Props} />);
    const testNode = screen.getByPlaceholderText("test-input") as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass("input-inner");
    fireEvent.change(testNode, { target: { value: "23" } });
    expect(Props.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual("23");
  });
  it("should render the disabled Input on disabled property", () => {
    render(<Input disabled placeholder="disabled" />);
    const testNode = screen.getByPlaceholderText("disabled") as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });
  it("should render different input sizes on size property", () => {
    const { container } = render(<Input placeholder="sizes" size="lg" />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const testContainer = container.querySelector(".input-wrapper");
    expect(testContainer).toHaveClass("input-size-lg");
  });
  it("should render prepand and append element on prepand/append property", () => {
    const { container } = render(<Input placeholder="pend" prepend="https://" append=".com" />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const testContainer = container.querySelector(".input-wrapper");
    expect(testContainer).toHaveClass("input-group input-group-append input-group-prepend");
    expect(screen.getByText("https://")).toBeInTheDocument();
    expect(screen.getByText(".com")).toBeInTheDocument();
  });
});
