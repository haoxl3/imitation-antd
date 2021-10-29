import React, {FunctionComponentElement, useState, useContext} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import {MenuItemProps} from './menuItem'

export interface SubMenuProps {
    index?: number;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, children, className}) => {
    // 设置子菜单的展开或隐藏
    const [menuOpen, setOpen] = useState(false);
    const context = useContext(MenuContext);
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index
    });
    // 点击菜单后显示子菜单
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    }
    // hover时显示子菜单
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300);
    }
    // 根据mode来判断点击或hover显示子菜单
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    }: {};
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
    }: {};
    const renderChildren = () => {
        // 设置点击时动态添加类名
        const subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        });
        // 设置渲染的子组件里只能有MenuItem
        const childrenComponent = React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            if (childElement.type.displayName === 'MenuItem') {
                return childElement;
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
        return (
            <ul className={subMenuClasses}>{childrenComponent}</ul>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>{title}</div>
            {renderChildren()}
        </li>
    )
}
SubMenu.displayName = 'SubMenu';
export default SubMenu;