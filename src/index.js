import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './ducks/store';
import { Provider } from 'react-redux';
import { HashRouter as R } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}><R><App /></R></Provider>, document.getElementById('root'));
registerServiceWorker();
