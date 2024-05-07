import React, { FC, useContext, useState, FunctionComponentElement, ReactNode } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";
import { MenuItemProps } from "./Menuitem";
export interface SubMenuProps {
  index?: string;
  /**下拉菜单选项的文字 */
  title: string;
  /**下拉菜单选型的扩展类名 */
  className?: string;
  children?: ReactNode;
}

export const SubMenu: FC<SubMenuProps> = ({ index, title, children, className }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };
  const context = useContext(MenuContext);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
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
        return childElement;
      } else {
        console.error("Waring:SubMenu has a child which is not a MenuItem component");
      }
    });
    return <ul className={subclasses}>{childrenComponent}</ul>;
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" onClick={handleClick} {...clickEvents}>
        {title}
      </div>
      {renderChilren()}
    </li>
  );
};

SubMenu.displayName = "Submenu";
