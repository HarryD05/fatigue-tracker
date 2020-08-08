//React dependencies
import React, { useState } from 'react';

//Styling
import './dayTile.scss';

//Components
import CatTimings from './catTimings';
import TirednessChart from './tirednessChart';

//Helpers 
import { formatDate, formatTime } from './../../helpers/date';
import { sleepQuality, sleepCause } from './../../helpers/enum';

const DayTile = props => {
  const { day } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const dayString = formatDate(new Date(day.startTime));
  const awakeTime = formatTime(new Date(day.startTime));
  const bedTime = day.endTime ? formatTime(new Date(day.endTime)) : 'Not yet submitted';
  const mentTiredness = day.avgMentTiredness ? day.avgMentTiredness : 'Not yet calculated - day not complete';
  const physTiredness = day.avgPhysTiredness ? day.avgPhysTiredness : 'Not yet calculated - day not complete';

  let timeSpent = [0, 0, 0, 0, 0];

  day.logs.forEach(log => {
    if (log.endTime) {
      const diff = Math.abs(new Date(log.endTime) - new Date(log.startTime)) / 1000;
      const mins = Number((diff / 60).toFixed(1));

      timeSpent[log.category] += mins;
    }
  })

  const renderDetails = () => {
    return (
      <div className="details">
        <div className="times">
          <h3>Woke up: </h3><p>{awakeTime}</p>
          <br />
          <h3>Bed time: </h3><p>{bedTime}</p>
        </div>

        <div className="sleep">
          <h3>Sleep</h3><br />
          <h4>Sleep quality: </h4><p>{sleepQuality[day.sleepQuality]}</p>
          <br />
          <h4>Worst cause of bad sleep: </h4><p>{sleepCause[day.sleepCause]}</p>
        </div>

        <div className="averages">
          <h3>Averages</h3><br />
          <h4>Physical tiredness: </h4><p>{physTiredness}</p>
          <br />
          <h4>Mental tiredness: </h4><p>{mentTiredness}</p>
        </div>

        <div className="categories-container">
          <h3>Time spent on each category</h3><br />
          <CatTimings timeSpent={timeSpent} {...props} />
        </div>

        <TirednessChart data={day} />
      </div>
    )
  }

  const showDayLogs = () => {
    props.history.push(`/logs/${day._id}`);
  }

  return (
    <div className="day-tile">
      <h2>{dayString}</h2>

      <div className="buttons">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
        >Summary</button>
        <button
          onClick={showDayLogs}
        >All logs</button>
      </div>

      {isExpanded ? renderDetails() : null}
    </div>
  )
}

export default DayTile;