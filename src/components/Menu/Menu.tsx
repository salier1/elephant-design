import React, { cloneElement, createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./Menuitem";
type menuMode = "horizontal" | "vertical";
export type selectCallback = (selsectedIndex: number) => void;
export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: menuMode;
  style?: React.CSSProperties;
  onSelect?: selectCallback;
  children?: React.ReactNode;
}
interface IMenuContext {
  index?: number;
  onSelect?: selectCallback;
  mode?: menuMode;
}

export const MenuContext = createContext<IMenuContext>({});
const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode = "horizontal", style, onSelect, children, ...restProps } = props;
  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode === "horizontal",
  });
  const [curIndex, setCurIndex] = useState(defaultIndex);
  const clickHandle = (index: number) => {
    setCurIndex(index);
    if (onSelect) onSelect(index);
  };
  const passedContext: IMenuContext = {
    index: curIndex,
    onSelect: clickHandle,
    mode:mode,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "Submenu") {
        return cloneElement(childElement, {
          index,
        });
      } else {
        console.error("Waring:Menu has a child which is not a MenuItem component");
      }
    });
  };
  return (
    <ul className={classes} style={style} {...restProps} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};
export default Menu;
