//React dependencies
import React from 'react';

//Styling
import './sleepScales.scss';

//Helpers
import { sleepQuality } from './../../helpers/enum';

const SleepQualityScale = props => {
  const renderScale = () => {
    return sleepQuality.map((quality, index) => {
      let classes = "radio " + String(quality).toLowerCase();

      return (
        <label className="container" key={index}>
          <input type="radio" name={props.name} value={index} onChange={props.radioChange} />
          <span className={classes}></span>
        </label>
      )
    });
  }

  return (
    <div className="sleep-quality-scale">
      {renderScale()}
    </div>
  )
}

export default SleepQualityScale;