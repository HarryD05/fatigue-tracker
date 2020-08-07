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
  let { loading, error, data } = useQuery(getDay, {
    variables: {
      dayId: id
    }
  });


  const renderDay = day => {
    if (day.logs) {
      if (day.logs[day.logs.length - 1].endTime === null) {
        day.logs.pop();
      }
    }

    return (
      <div className="day">
        <h1>{formatDate(new Date(day.date))}</h1>


        <h2>Key</h2>
        <div className="key">
          <div className="key-box input-data first"></div><b>Input data</b>
          <div className="key-box retrieved-data"></div><b>Retrieved data</b>
          <div className="key-box calculated"></div><b>Calculated</b>
        </div>

        <table>
          <thead>
            <tr>
              <th className="input-data">Start time</th>
              <th>End time</th>
              <th className="calculated">Length (minutes)</th>
              <th className="input-data">Category</th>
              <th>Start mental tiredness</th>
              <th className="input-data">End mental tiredness</th>
              <th className="calculated">Change in mental tiredness</th>
              <th className="calculated">Rate of change in mental tiredness (units per min)</th>
              <th>Start physical tiredness</th>
              <th className="input-data">End physical tiredness</th>
              <th className="calculated">Change in physical tiredness</th>
              <th className="calculated">Rate of change in physical tiredness (units per min)</th>
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