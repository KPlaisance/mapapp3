import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

//  Registering service worker

// if ('serviceWorker' in navigator){
//     navigator.serviceWorker
//     .register('/src/serviceWorker.js')
//     .catch(function(err) {
//       console.error(err);
//     });
//   }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
