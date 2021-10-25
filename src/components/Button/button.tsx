import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

const Button: React.FC<BaseButtonProps> = (props) => {
    const {btnType, disabled, size, children, href} = props;
    const classes = classNames('btn', {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    });
    // 如果是A链接，则返回a标签
    if (btnType === ButtonType.Link && href) {
        return (
            <a
                className = {classes}
                href={href}
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
            >
                {children}
            </button>
        );
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button;