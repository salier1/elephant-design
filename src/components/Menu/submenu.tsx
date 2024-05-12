import React, { FC, useContext, useState, FunctionComponentElement, ReactNode } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { MenuItemProps } from "./Menuitem";
import Icon from "../Icon";
import Transition from "../Transition";
export interface SubMenuProps {
  index?: string;
  /**下拉菜单选项的文字 */
  title: string;
  /**下拉菜单选型的扩展类名 */
  className?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

export const Submenu: FC<SubMenuProps> = ({ index, title, children, className, defaultOpen }) => {
  const context = useContext(MenuContext);
  const [menuOpen, setMenuOpen] = useState(defaultOpen);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
    // if (context.onSelect && typeof index === "string") context.onSelect(index);
  };

  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });
  const subclasses = classNames("menu-submenu", {
    "menu-opened": menuOpen,
  });

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };
  const clickEvents = context.mode === "vertical" && {
    onClick: handleClick,
  };
  const hoverEvents = context.mode !== "vertical" && {
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouse(e, true);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouse(e, false);
    },
  };
  const renderChilren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error("Waring:SubMenu has a child which is not a MenuItem component");
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subclasses}>{childrenComponent}</ul>
      </Transition>
    );
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" onClick={handleClick} {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChilren()}
    </li>
  );
};

Submenu.displayName = "Submenu";
export default Submenu;
