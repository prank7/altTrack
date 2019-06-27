import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { createStore,compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/Reducer';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

// TODO: Learn about createStore in redux.
const store = createStore(rootReducer, composeEnchancers(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}> <App /> </Provider>,
	document.getElementById('root')
);

serviceWorker.unregister();
