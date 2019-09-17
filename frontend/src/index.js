import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from '../src/components/App';
import * as serviceWorker from './serviceWorker';
import store from './store/index';
import {Provider} from 'react-redux';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
