import React, { cloneElement, createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./Menuitem";
import { SubMenuProps } from "./submenu";
type menuMode = "horizontal" | "vertical";
export type selectCallback = (selsectedIndex: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: menuMode;
  style?: React.CSSProperties;
  onSelect?: selectCallback;
  children?: React.ReactNode;
  defaultOpenSub?: string[];
}
interface IMenuContext {
  index?: string;
  onSelect?: selectCallback;
  mode?: menuMode;
  defaultOpenSub?: string[];
}

export const MenuContext = createContext<IMenuContext>({});
const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex = "0",
    className,
    mode = "horizontal",
    style,
    onSelect,
    children,
    defaultOpenSub = [],
    ...restProps
  } = props;
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
    mode,
    defaultOpenSub,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps | SubMenuProps
      >;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem") {
        return cloneElement(childElement, {
          index: index.toString(),
        });
      } else if (displayName === "Submenu") {
        return cloneElement(childElement, {
          index: index.toString(),
          defaultOpen: defaultOpenSub.includes(index.toString()),
        });
      } else {
        console.error(
          "Waring:Menu has a child which is not a MenuItem component"
        );
      }
    });
  };
  return (
    <ul
      className={classes}
      style={style}
      {...restProps}
      data-testid="test-menu"
    >
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};
export default Menu;
