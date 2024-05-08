import type { Meta, StoryObj } from "@storybook/react";

import Button from "./index";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
};
const styles: React.CSSProperties = {
  textAlign: "center",
};
const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>;
export default meta;
type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const moren: Story = {
  name: "默认Button",
  render: () => <Button>default</Button>,
};
export const size: Story = {
  name: "各种大小的Button",
  render: () => (
    <>
      <Button size="lg">lg button</Button>
      <Button size="md">md button</Button>
      <Button size="sm">sm button</Button>
    </>
  ),
};
export const style: Story = {
  name: "各种样式的Button",
  render: () => (
    <>
      <Button btnType="default">default button</Button>
      <Button btnType="danger">danger button</Button>
      <Button btnType="primary">primary button</Button>
      <Button btnType="link">link button</Button>
    </>
  ),
};
export const disabled: Story = {
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
