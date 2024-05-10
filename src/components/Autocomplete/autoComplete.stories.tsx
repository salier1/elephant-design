import type { Meta, StoryObj } from "@storybook/react";
import { AutoComplete } from "./autoComplete";
import { fn } from "@storybook/test";
const meta = {
  component: AutoComplete,
  tags: ["autodocs"],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
const alphabt = ["1", "2", "3", "4", "12", "23", "34", "123", "234", "1234"];
const handlefetch = (query: string) => {
  return alphabt.filter((name) => name.includes(query));
};
export const Hejiawei: Story = {
  name: "haha",
  args: {
    fetchSuggestions: handlefetch,
    onSelect: fn(),
  },
};
