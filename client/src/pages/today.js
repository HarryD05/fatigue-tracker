//React dependencies
import React, { useState } from 'react';

//Apollo dependencies
import { graphql } from 'react-apollo';
import today from './../queries/today';

//Styling
import './pages.scss';

//Helpers
import { formatDate } from './../helpers/date';

//Components
import InitDayForm from './../components/initDayForm/initDayForm';

const Today = props => {
  const { today, loading } = props.data;

  let needToInit = false;
  if (today) {
    needToInit = (new Date(today.date).getDate() !== new Date().getDate())
  }

  const onInitSubmit = () => {
    props.data.refetch();
  }

  console.log(needToInit);

  return (
    <div className="today">
      <h1>Today</h1>
      <h2>{formatDate(new Date())}</h2>
      <br />

      {loading ? <h2 className="loading">Loading...</h2> : null}
      {needToInit ? <InitDayForm onComplete={onInitSubmit} /> : null}
    </div>
  )
}

export default graphql(today)(Today);