import type { Meta, StoryObj } from "@storybook/react";
import Upload from "./Upload";
import { action } from "@storybook/addon-actions";
const meta = {
  component: Upload,
  // parameters: {
  //   layout: "centered",
  // },
  tags: ["autodocs"],

  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>;
// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert("too big!");
//     return false;
//   }
//   return true;
// };

const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.docx", { type: file.type });
  return Promise.resolve(newFile);
};
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

export const Moren: Story = {
  name: "Alert",
  args: {
    action: "https://jsonplaceholder.typicode.com/posts",
    onChange: action("change"),
    beforeUpload: filePromise,
    onSuccess: action("success"),
  },
};
