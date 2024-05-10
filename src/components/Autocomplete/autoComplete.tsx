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
import useDebounce from "../../hooks/useDebounce";
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
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const useDebounceValue = useDebounce(inputValue, 500);
  useEffect(() => {
    if (useDebounceValue) {
      const results = fetchSuggestions(useDebounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((res) => {
          setSuggestions(res);
        });
        setLoading(false);
      } else setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  }, [useDebounceValue]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
