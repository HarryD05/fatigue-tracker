//React dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

//Apollo client
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//components
import App from './App';

//Styling
import './index.scss';

//Using ApolloClient to connect with server
const client = new ApolloClient({
  uri: '/graphql'
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router><App /></Router>
  </ApolloProvider>,
  document.getElementById('root')
);
