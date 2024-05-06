import React, { FC, useContext, ReactNode } from "react";
import classNames from "classnames";
export interface MenuItemProps {
  index?: string;
  /**选项是否被禁用 */
  disabled?: boolean;
  /**选项扩展的 className */
  className?: string;
  /**选项的自定义 style */
  style?: React.CSSProperties;
  children?: ReactNode;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": true,
  });

  return (
    <li className={classes} style={style}>
      {children}
    </li>
  );
};

export default MenuItem;
