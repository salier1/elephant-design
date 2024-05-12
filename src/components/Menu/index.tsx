import { FC } from "react";
import Menu, { MenuProps } from "./Menu";
import Menuitem, { MenuItemProps } from "./Menuitem";
import Submenu, { SubMenuProps } from "./submenu";

export type ImenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
};

const TransMenu = Menu as ImenuComponent;

TransMenu.Item = Menuitem;
TransMenu.SubMenu = Submenu;

export default TransMenu;
