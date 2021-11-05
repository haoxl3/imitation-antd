
// storybook中的react-docgen-typescript-loader自动生成文档要求将react中方法用{}引入，否则将不会根据代码自动生成文档
import React, {FC, ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
    className?: string;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: ButtonSize;
    /**设置 Button 的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}
// 交叉类型,将button原生属性、a链接的属性、传入的属性相结合
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
// Partial代表属性可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面按钮
 *  ### 引用方法
 * ~~~js
 * import {Button} from 'imitation-antd'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
    const {btnType, className, disabled, size, children, href, ...restProps} = props;
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    });
    // 如果是A链接，则返回a标签
    if (btnType === 'link' && href) {
        return (
            <a
                className = {classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        );
    } // 其它情况为button
    else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        );
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button;