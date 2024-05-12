import type { Meta, StoryObj } from "@storybook/react";
import Progress from "./index";
// import { fn } from "@storybook/test";
const meta = {
  component: Progress,
  // parameters: {
  //   layout: "centered",
  // },
  tags: ["autodocs"],
  args: {
    percent: 0,
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Moren: Story = {
  name: "percent",
};
