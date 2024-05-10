import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/Input";

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => string[];
  onSelect?: (item: string) => void;
  renderOption?: (item: string) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restprops } = props;
  useEffect(() => {
    // console.log(suggestions);
  });
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const value = e.target.value.trim();
    if (value) {
      const results = fetchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };
  const handleSelect = (item: string) => {
    setInputValue(item);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => (
          <li key={index} onClick={() => handleSelect(item)}>
            {item}
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="auto-complete">
      <Input value={inputValue} onChange={(e) => handleChange(e)} {...restprops}></Input>
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};
