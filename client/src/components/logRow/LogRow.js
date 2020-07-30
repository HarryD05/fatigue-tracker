//React dependencies
import React from 'react';

//Helper
import { formatTime } from './../../helpers/date';

//Styling
import './logRow.scss';

const categories = {
  0: 'Required',
  1: 'Rest',
  2: 'Rehabilitation',
  3: 'Socialising',
  4: 'Non-productive'
}

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
      <td>{(mentDiff / length).toFixed(2)}</td>
      <td>{log.initPhysTiredness}</td>
      <td>{log.endPhysTiredness}</td>
      <td>{physDiff}</td>
      <td>{(physDiff / length).toFixed(2)}</td>
    </tr>
  )
}

export default LogRow;