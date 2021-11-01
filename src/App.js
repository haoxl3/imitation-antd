import './App.css';
import './styles/index.scss';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import Button, {ButtonType, ButtonSize} from './components/Button/button.tsx';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
library.add(fas);

function App() {
    return (
        <div className="App">
          <header className="App-header">
          <Icon icon="arrow-down" theme="danger" size="10x"/>
            <Menu defaultIndex='0' onSelect={(index)=>alert(index)} mode="vertical" defaultOpenSubMenus={['2']}>
              <MenuItem>link1</MenuItem>
              <MenuItem disabled>link2</MenuItem>
              <SubMenu title="dropdown">
                <MenuItem>dropdown</MenuItem>
                <MenuItem>dropdown2</MenuItem>
              </SubMenu>
              <MenuItem>link3</MenuItem>
            </Menu>
            <Button disabled>hello</Button>
            <Button autoFocus>hello</Button>
            <Button onClick={e => {e.preventDefault();alert(1)}}>hello</Button>
            <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Primary</Button>
            <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Danger</Button>
            <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_black">baidu</Button>
            <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>hello</Button>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
}

export default App;
