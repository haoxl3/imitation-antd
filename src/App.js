import './App.css';
import './styles/index.scss';
import Button, {ButtonType, ButtonSize} from './components/Button/button.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button disabled>hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Primary</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Danger</Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com">baidu</Button>
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
