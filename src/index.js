import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WrappedApp from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store } from './App';
 
ReactDOM.render(
	<Provider store = {store}>
		<WrappedApp />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
