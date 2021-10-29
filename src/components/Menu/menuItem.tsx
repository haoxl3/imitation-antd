import React, {useContext} from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu'

export interface MenuItemProps {
    index?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {index, disabled, className, style, children} = props;
    // 获取父组件传来的值
    const context = useContext(MenuContext);
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    // 调用父组件传来的方法
    const handleClick = () => {
        // 当有父组件传来的onSelect方法，且disabled不为true才可调用点击的回调函数
        if (context.onSelect && !disabled && (typeof index === 'number')) {
            context.onSelect(index);
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>{children}</li>
    )
}
MenuItem.displayName = 'MenuItem';
export default MenuItem;