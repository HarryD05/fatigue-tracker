//React dependencies
import React from 'react';

//Styling
import './dayTile.scss';

//Helpers 
import { formatDate, formatTime } from './../../helpers/date';

const DayTile = props => {
  const { day } = props;
  const dayString = formatDate(new Date(day.startTime));
  const awakeTime = formatTime(new Date(day.startTime));
  const bedTime = formatTime(new Date(day.endTime));

  return (
    <div className="day-tile">
      <h2>{dayString}</h2>
      <button
        onClick={() => alert('Not implemented yet....')}
      >See all logs</button>

      <div className="times">
        <h3>Woke up: </h3><p>{awakeTime}</p>
        <br />
        <h3>Bed time: </h3><p>{bedTime}</p>
      </div>

      <div className="averages">
        <h3>Averages</h3><br />
        <h4>Physical tiredness: </h4><p>Not implemented yet...</p>
        <br />
        <h4>Mental tiredness: </h4><p>Not implemented yet...</p>
      </div>

      <div className="categories">
        <h3>Time spent on each category</h3><br />
        <p>Not implemented yet...</p>
      </div>


    </div>
  )
}

export default DayTile;