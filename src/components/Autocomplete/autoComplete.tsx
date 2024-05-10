import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/Input";
import Icon from "../Icon";

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}
export interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restprops } =
    props;
  useEffect(() => {
    // console.log(suggestions);
  });
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const value = e.target.value.trim();
    if (value) {
      const results = fetchSuggestions(value);
      if (results instanceof Promise) {
        setLoading(true);
        setSuggestions(await results);
        setLoading(false);
      } else setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => handleSelect(item)}>
            {renderTemplate(item)}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="auto-complete">
      <Input
        value={inputValue}
        onChange={(e) => handleChange(e)}
        {...restprops}
      ></Input>
      {loading && (
        <div className="icon-wrapper">
          <Icon icon="spinner" className="loading-icon" size="2xl" />
        </div>
      )}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};
