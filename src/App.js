import './App.css';
import './styles/index.scss';
import Button, {ButtonType, ButtonSize} from './components/Button/button.tsx';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu defaultIndex={0} onSelect={(index)=>alert(index)}>
          <MenuItem index={0}>link1</MenuItem>
          <MenuItem index={1} disabled>link2</MenuItem>
          <MenuItem index={2}>link3</MenuItem>
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
