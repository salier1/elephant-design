import React, { createContext, useState } from "react";
import classNames from "classnames";
type menuMode = "horizontal" | "vertical";
export type selectCallback = (selsectedIndex: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: menuMode;
  style?: React.CSSProperties;
  onSelect?: selectCallback;
  children?: React.ReactNode;
}
interface IMenuContext {
  index: string;
  onSelect?: selectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });
const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex = "0", className, mode = "hotizontal", style, onSelect, children, ...restProps } = props;
  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode === "horizontal",
  });
  const [curIndex, setCurIndex] = useState(defaultIndex);
  const clickHandle = (index: string) => {
    setCurIndex(index);
    if (onSelect) onSelect(index);
  };
  const passedContext: IMenuContext = {
    index: curIndex,
    onSelect: clickHandle,
  };

  return (
    <ul className={classes} style={style} {...restProps} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{children}</MenuContext.Provider>
    </ul>
  );
};
export default Menu;
