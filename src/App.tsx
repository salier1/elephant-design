import React, { useEffect, useState } from "react";
import AutoComplete from "./components/Autocomplete";
import { DataSourceType } from "./components/Autocomplete/autoComplete";
function App() {
  const [nihao, nnihao] = useState(10);

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
        return formatItems;
      }) as Promise<DataSourceType[]>;
    return promisedItem;
  };

  const renderOption = (item: DataSourceType) => {
    const githubUser = item as DataSourceType<GithubUserProps>;
    return (
      <div>
        <h2>{githubUser.value}</h2>
        <h3>{githubUser.url} wow!!</h3>
        {/* <h3>{itemWithNumber.url} wow!!</h3> */}
      </div>
    );
  };

  useEffect(() => {
    nnihao(10);
    console.log(nihao);
  }, [nihao]);
  return (
    <div className="App">
      <div>
        <div style={{ margin: "0 auto", width: "200px", height: "200px" }}>
          aaa
        </div>
      </div>

      <AutoComplete
        fetchSuggestions={handlefetch}
        renderOption={renderOption}
      ></AutoComplete>
    </div>
  );
}

export default App;
