import { createRoot } from 'react-dom/client';
import Popup from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


// Before:
// ReactDOM.render(<App />, document.getElementById('root'));

// After:
const rootElement = document.getElementById('app') as HTMLElement;
const root = createRoot(rootElement ?? document.createElement('div'));
root.render(<Popup />);