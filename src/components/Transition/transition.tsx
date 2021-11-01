import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {CSSTransitionProps} from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';
type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName,
    wrapper?: boolean // 当组件有自身的transition时需要在其外层包裹div防止样式覆盖
}

const Transition: React.FC<TransitionProps> = (props) => {
    const {children, classNames, wrapper, animation, ...restProps} = props;
    return (
        <CSSTransition
            classNames={classNames ? classNames : animation}
            {...restProps}
        >
            {wrapper ? <div>{children}</div> : children}
        </CSSTransition>
    );
}
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
}
export default Transition;