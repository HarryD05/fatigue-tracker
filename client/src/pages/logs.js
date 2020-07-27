//React dependencies
import React from 'react';

//Apollo dependencies
import { graphql } from 'react-apollo';
import getDays from './../queries/getDays';

//Components
import DayTile from '../components/dayTile/dayTile';

//Styling
import './pages.scss';

const Logs = props => {
  const { loading, days } = props.data;

  return (
    <div className='logs'>
      <h1>Logs</h1>

      {loading && <h2 className="loading">Loading...</h2>}
      {days && days.map(day => <DayTile key={day._id} day={day} />)}
    </div>
  )
}

export default graphql(getDays)(Logs);