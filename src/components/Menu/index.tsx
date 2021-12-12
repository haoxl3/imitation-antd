import {FC} from 'react';
import Menu, {MenuProps} from './menu';
import SubMenu, {SubMenuProps} from './subMenu';
import MenuItem, {MenuItempProps} from './menuItem';

export type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItempProps>,
    SubMenu: FC<SubMenuProps>
}
const TransMenu = Menu as IMenuComponent;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;