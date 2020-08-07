//React dependencies
import React from 'react';

//Apollo dependencies
import { useQuery } from 'react-apollo';
import today from './../../queries/today';

//Styling
import './currentActivity.scss';

//Helpers
import { formatTime } from './../../helpers/date';

const categories = {
  0: 'Required',
  1: 'Rest',
  2: 'Rehabilitation',
  3: 'Socialising',
  4: 'Non-productive'
}

const CurrentActivity = () => {
  let { loading, error, data } = useQuery(today);

  const renderDetails = () => {
    if (data.today.logs) {
      if (data.today.logs.length > 0) {
        const log = data.today.logs[data.today.logs.length - 1];

        return (
          <div className="details">
            <h3>Start time: </h3><span>{formatTime(new Date(log.startTime))}</span><br />
            <h3>Category: </h3><span>{categories[log.category]}</span>
          </div>
        )
      }
    }
  }

  return (
    <div className="current-activity">
      <h2>Current activity</h2>
      {loading ? <h2 className="loading">Loading...</h2> : null}
      {error ? <h2 className="error">ERROR</h2> : null}
      {!loading && !error ? renderDetails() : null}
    </div>
  )
}

export default CurrentActivity;