import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import discussionApp from './reducers';
// import data from './data/discussion.json';
import data from './data/discussion2.json';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

let store = createStore(discussionApp, {
  ...data.discussion,
  snackbar: {},
  sort: 'old'
});
import App from './App';


ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
