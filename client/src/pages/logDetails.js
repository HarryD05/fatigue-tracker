//React dependencies
import React from 'react';
import { useParams } from 'react-router-dom';

//Apollo dependencies
import { useQuery } from 'react-apollo';
import getDay from './../queries/getDay';

//Components
import LogRow from './../components/logRow/LogRow';

//Styling
import './pages.scss';

//Helpers
import { formatDate } from './../helpers/date';

const LogDetails = props => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(getDay, {
    variables: {
      dayId: id
    }
  });

  const renderDay = day => {
    return (
      <div className="day">
        <h1>{formatDate(new Date(day.date))}</h1>
        <table>
          <thead>
            <tr>
              <th>Start time</th>
              <th>End time</th>
              <th>Length (minutes)</th>
              <th>Category</th>
              <th>Start mental tiredness</th>
              <th>End mental tiredness</th>
              <th>Change in mental tiredness</th>
              <th>Rate of change in mental tiredness (units per min)</th>
              <th>Start physical tiredness</th>
              <th>End physical tiredness</th>
              <th>Change in physical tiredness</th>
              <th>Rate of change in physical tiredness (units per min)</th>
            </tr>
          </thead>
          <tbody>
            {day.logs.map(log => <LogRow key={log._id} log={log} />)}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className='day-details'>
      {loading && <h2 className="loading">Loading...</h2>}
      {error && <h2 className="error">ERROR</h2>}
      {!loading && !error && data.day && renderDay(data.day)}
    </div>
  )
}

export default LogDetails;