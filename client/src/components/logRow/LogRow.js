//React dependencies
import React from 'react';

//Helper
import { formatTime } from './../../helpers/date';
import { categories } from './../../helpers/enum';

//Styling
import './logRow.scss';

const LogRow = props => {
  const { log } = props;

  //start time - end time - length - category - initMent - endMent - changeMent - rateOfChangeMent - initPhys - endPhys - changePhys - rateOfChangePhys

  const calcDiff = (endTime, startTime) => {
    const diff = Math.abs(new Date(endTime) - new Date(startTime)) / 1000;
    const mins = Number((diff / 60).toFixed(1));

    return mins;
  }

  const length = calcDiff(log.endTime, log.startTime);
  const mentDiff = log.endMentTiredness - log.initMentTiredness;
  const physDiff = log.endPhysTiredness - log.initPhysTiredness;

  return (
    <tr>
      <td>{formatTime(new Date(log.startTime))}</td>
      <td>{formatTime(new Date(log.endTime))}</td>
      <td>{length}</td>
      <td>{categories[log.category]}</td>
      <td>{log.initMentTiredness}</td>
      <td>{log.endMentTiredness}</td>
      <td>{mentDiff}</td>
      <td>{(mentDiff / length).toFixed(3)}</td>
      <td>{log.initPhysTiredness}</td>
      <td>{log.endPhysTiredness}</td>
      <td>{physDiff}</td>
      <td>{(physDiff / length).toFixed(3)}</td>
    </tr>
  )
}

export default LogRow;