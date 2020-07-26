import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

//components
import App from './App';

//Styling
import './index.scss';

ReactDOM.render(
  <Router><App /></Router>,
  document.getElementById('root')
);
