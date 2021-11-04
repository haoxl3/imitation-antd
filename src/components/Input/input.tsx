import React, {FC, ReactElement, InputHTMLAttributes, ChangeEvent} from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import { IconProps } from '../Icon/icon';
import classNames from 'classnames';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'sm';
// Omit忽略某值的类型，因为组件的size为字符型，input自带的size为number，故先忽略它
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**是否禁用 Input */
    disabled?: boolean;
    /**设置 input 大小，支持 lg 或者是 sm */
    size?: InputSize;
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProps;
    /**添加前缀 用于配置一些固定组合 */
    prepend?: string | ReactElement;
    /**添加后缀 用于配置一些固定组合 */
    append?: string | ReactElement;
    onChange? : (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * 
 * ~~~js
 * // 这样引用
 * import { Input } from 'imitation-antd'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: FC<InputProps> = (props) => {
    const {disabled, size, icon, prepend, append, style, ...restProps} = props;
    const cnames = classNames('viking-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    });
    // 受控组件如果没有初始值则会报错，故在此赋初始值
    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    }
    // react要求value和defaultValue不能同时出现在input上，故删除一个
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (
        <div className={cnames} style={style}>
            {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
            <input
                className="viking-input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="viking-input-group-append">{append}</div>}
        </div>
    );
}
export default Input;