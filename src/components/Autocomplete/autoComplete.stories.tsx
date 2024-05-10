import type { Meta, StoryObj } from "@storybook/react";
import { AutoComplete } from "./autoComplete";
import { fn } from "@storybook/test";
import { DataSourceType } from "./autoComplete";
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
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
// interface alpahabtProps {
//   value: string;
//   number: number;
// }
// const alphabt: DataSourceType<alpahabtProps>[] = [
//   { value: "a", number: 1 },
//   { value: "b", number: 2 },
//   { value: "c", number: 3 },
//   { value: "d", number: 4 },
//   { value: "e", number: 5 },
//   { value: "f", number: 6 },
//   { value: "g", number: 7 },
//   { value: "h", number: 8 },
//   { value: "i", number: 9 },
//   { value: "ab", number: 10 },
//   { value: "abc", number: 11 },
//   { value: "abcd", number: 12 },
//   { value: "abcde", number: 13 },
// ];
// const handlefetch = (query: string) => {
//   return alphabt.filter((item) => item.value.includes(query));
// };
// const renderOption = (item: DataSourceType) => {
//   const itemWithNumber = item as DataSourceType<alpahabtProps>;
//   return (
//     <div>
//       <h2>{itemWithNumber.value} is very good!</h2>
//       <h3>{itemWithNumber.number} wow!!</h3>
//     </div>
//   );
// };
const handlefetch = (query: string) => {
  const promisedItem = fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      const formatItems = items.slice(0, 10).map((item: any) => {
        return {
          value: item.login,
          ...item,
        };
      });
      console.log(formatItems);
    }) as Promise<DataSourceType[]>;
  return promisedItem;
};

const renderOption = (item: DataSourceType) => {
  const githubUser = item as DataSourceType<GithubUserProps>;
  return (
    <div>
      <h2>{githubUser.value} is very good!</h2>
      <h3>{githubUser.url} wow!!</h3>
      {/* <h3>{itemWithNumber.url} wow!!</h3> */}
    </div>
  );
};
export const Hejiawei: Story = {
  name: "haha",
  args: {
    fetchSuggestions: handlefetch,
    onSelect: fn(),
    renderOption: renderOption,
  },
};
