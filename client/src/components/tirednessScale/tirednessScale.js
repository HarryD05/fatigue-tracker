//React dependencies
import React from 'react';

//Styling
import './tirednessScale.scss';

const TirednessScale = props => {
  const renderScale = () => {
    const scale = [0, 1, 2, 3, 4, 5, 6];
    return scale.map(num => {
      return (
        <label className="container" key={num}><p>{num}</p>
          <input type="radio" name={props.name} value={num} onChange={props.radioChange} />
          <span className="radio big"></span>
        </label>
      )
    })
  }

  return (
    <div className="tiredness-scale">
      {renderScale()}
    </div>
  )
}

export default TirednessScale;