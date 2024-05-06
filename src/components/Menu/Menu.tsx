import React from "react";
import className from "classnames";
type menuMode = "hotizontal" | "vertical";
export interface MenuProps {
  defaultIndex?: string;
  classNames?: string;
  mode?: menuMode;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: number) => void;
  children: React.ReactNode;
}
const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex = 0, classNames, mode = "hotizontal", style, onSelect, children, ...args } = props;
  const classes = className("menu", classNames, {
    "menu-vertical": mode === "vertical",
    "menu-hotizontal": mode === "hotizontal",
  });
  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  );
};
export default Menu;
