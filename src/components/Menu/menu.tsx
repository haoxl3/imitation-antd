import React, {createContext, useState} from 'react';
import classNames from 'classnames';
import {MenuItemProps} from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: number) => void;
export interface MenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}
interface IMenuContext {
    index: number;
    onSelect?: SelectCallback;
}
// index将从父组件传给子组件，指默认显示哪个菜单
export const MenuContext = createContext<IMenuContext>({index: 0});
const Menu: React.FC<MenuProps> = (props) => {
    const {className, mode, style, children, defaultIndex, onSelect} = props;
    // useState来将变化的菜单索引传给子组件
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical'
    });
    // 选中菜单的回调函数
    const handleClick = (index: number) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    }
    // 将被点击的菜单索引值及回调函数传给子组件
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick
    }
    // 确保子组件中只可渲染menuItem
    const renderChildren = () => {
        // React.Children.map react提供的方法，对非数组的不报错
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            // .type存放了组件所有的静态属性
            const {displayName} = childElement.type;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index
                })
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    }
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );
}
Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu;