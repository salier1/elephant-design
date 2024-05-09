import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { fn } from "@storybook/test";
const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
    },
    btnType: {
      control: "inline-radio",
      options: ["primary", "danger", "default", "link"],
    },
  },
  args: {
    onClick: fn(),
    className: "",
    size: "md",
    btnType: "default",
    disabled: false,
    href: "https://www.baidu.com",
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Moren: Story = {
  name: "默认Button",
  args: {
    children: "Button",
  },
};
export const Size: Story = {
  name: "各种大小的Button",
  render: () => (
    <>
      <Button size="lg">lg button</Button>
      <Button size="md">md button</Button>
      <Button size="sm">sm button</Button>
    </>
  ),
};
export const Style: Story = {
  name: "各种样式的Button",
  render: () => (
    <>
      <Button btnType="default">default button</Button>
      <Button btnType="danger">danger button</Button>
      <Button btnType="primary">primary button</Button>
      <Button btnType="link" href="https://www.baidu.com">
        link button
      </Button>
    </>
  ),
};
export const Disabled: Story = {
  name: "被禁用的Button",
  render: () => (
    <>
      <Button>default button</Button>
      <Button disabled>disabled button</Button>
      <Button disabled btnType="link">
        disabled link button
      </Button>
    </>
  ),
};
