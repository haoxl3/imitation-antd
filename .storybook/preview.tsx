import {configure, addDecorator, addParameters} from '@storybook/react';
import React from 'react';
import {withInfo} from '@storybook/addon-info';
import '../src/styles/index.scss';

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px'
};
const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
)
addDecorator(storyWrapper);
addDecorator(withInfo);
addParameters({info: {inline: true, header: false}})

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}