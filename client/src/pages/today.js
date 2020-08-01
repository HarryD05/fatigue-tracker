//React dependencies
import React from 'react';

//Apollo dependencies
import { graphql } from 'react-apollo';
import today from './../queries/today';

//Styling
import './pages.scss';

//Helpers
import { formatDate } from './../helpers/date';

//Components
import InitDayForm from './../components/initDayForm/initDayForm';
import NewLogForms from './../components/newLogForms/newLogForms';

const Today = props => {
  const { today, loading } = props.data;

  let needToInit = true;
  let firstLog = false;
  let completed = false;

  if (today) {
    needToInit = (new Date(today.date).getDate() !== new Date().getDate());
    firstLog = today.logs.length === 0;
    completed = (today.endTime ? true : false);
  }

  const onSubmit = message => {
    props.data.refetch();

    alert((message) ? message : 'Successful');
  }

  return (
    <main className="today">
      <h1>Today</h1>
      <h2>{formatDate(new Date())}</h2>
      <br />

      {loading ? <h2 className="loading">Loading...</h2> : null}
      {!loading && needToInit ? <InitDayForm onComplete={onSubmit} {...props} /> : null}
      {!loading && !needToInit && today && !completed ? <NewLogForms onComplete={onSubmit} isFirstLog={firstLog} startTime={today.startTime} {...props} /> : null}
      {!loading && !needToInit && completed ? <h2>Completed</h2> : null}
    </main>
  )
}

export default graphql(today)(Today);