//React dependencies
import React from 'react';

//Apollo dependencies
import { useQuery } from 'react-apollo';
import today from './../../queries/today';

//Styling
import './currentActivity.scss';

//Helpers
import { formatTime } from './../../helpers/date';
import { categories } from './../../helpers/enum';

const CurrentActivity = () => {
  let { loading, error, data } = useQuery(today);

  const renderDetails = () => {
    if (data.today.logs) {
      if (data.today.logs.length > 0) {
        const log = data.today.logs[data.today.logs.length - 1];

        return (
          <div className="details">
            <h3>{formatTime(new Date(log.startTime))}</h3><br />
            <h4>Category: </h4><span>{categories[log.category]}</span><br />
            <h4>Physical tiredness: </h4><span>{log.initPhysTiredness}</span><br />
            <h4>Mental tiredness: </h4><span>{log.initMentTiredness}</span>
          </div>
        )
      }
    }
  }

  return (
    <div className="current-activity">
      <h2>Previous Log</h2>
      {loading ? <h2 className="loading">Loading...</h2> : null}
      {error ? <h2 className="error">ERROR</h2> : null}
      {!loading && !error ? renderDetails() : null}
    </div>
  )
}

export default CurrentActivity;