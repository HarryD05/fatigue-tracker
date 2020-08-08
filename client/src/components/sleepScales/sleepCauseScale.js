//React dependencies
import React from 'react';

//Styling
import './sleepScales.scss';

//Helpers
import { sleepCause } from './../../helpers/enum';

const SleepCauseScale = props => {
  const renderScale = () => {
    return sleepCause.map((cause, index) => {
      return (
        <label className="container">
          <input type="radio" name={props.name} value={index} onChange={props.radioChange} />
          <span className="radio"></span>
        </label>
      )
    });
  }

  return (
    <div className="sleep-cause-scale">
      {renderScale()}
    </div>
  )
}

export default SleepCauseScale;