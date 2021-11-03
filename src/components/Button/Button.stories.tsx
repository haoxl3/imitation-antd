// import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';

// import button from '../components/Button/button';
// // import '../styles/index.scss';

// // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// export default {
//   title: 'Example/Button',
//   component: button,
//   // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
// } as ComponentMeta<typeof button>;

// // More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof button> = (args) => <button {...args}>按钮</button>;

// export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//     btnType: 'primary',
//     size: 'lg',
// };
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './button'

// 创建一个装饰器，让所有组件居中
const styles: React.CSSProperties = {
  textAlign: 'center'
}
const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
const defaultButton = () => (
  <Button onClick={action('clicked')}> default button </Button>
)

const buttonWithSize = () => (
  <>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </>
)

const buttonWithType = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://google.com"> link button </Button>
  </>
)
storiesOf('Button Component', module)
  .addDecorator(CenterDecorator)
  .add('Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同类型的 Button', buttonWithType)