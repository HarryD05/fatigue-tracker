//React dependencies
import React from 'react';

//Apollo dependencies
import { graphql } from 'react-apollo';
import today from './../queries/today';

//Styling
import './pages.scss';

//Helpers
import { formatDate } from './../helpers/date';

const Today = props => {
  const { today, loading } = props.data;

  console.log({ today, loading });

  return (
    <div className="today">
      <h1>Today</h1>
      <h2>{formatDate(new Date())}</h2>
    </div>
  )
}

export default graphql(today)(Today);