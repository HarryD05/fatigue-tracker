//React dependencies
import React from 'react';

//Styling
import './tirednessScale.scss';

const TirednessScale = props => {
  return (
    <div className="tiredness-scale">
      <label className="container"><p>0</p>
        <input type="radio" name={props.name} value={0} onChange={props.radioChange} />
        <span className="radio big"></span>
      </label>

      <label className="container"><p>1</p>
        <input type="radio" name={props.name} value={1} onChange={props.radioChange} />
        <span className="radio small"></span>
      </label>

      <label className="container"><p>2</p>
        <input type="radio" name={props.name} value={2} onChange={props.radioChange} />
        <span className="radio big"></span>
      </label>

      <label className="container"><p>3</p>
        <input type="radio" name={props.name} value={3} onChange={props.radioChange} />
        <span className="radio small"></span>
      </label>

      <label className="container"><p>4</p>
        <input type="radio" name={props.name} value={4} onChange={props.radioChange} />
        <span className="radio big"></span>
      </label>

      <label className="container"><p>5</p>
        <input type="radio" name={props.name} value={5} onChange={props.radioChange} />
        <span className="radio small"></span>
      </label>

      <label className="container"><p>6</p>
        <input type="radio" name={props.name} value={6} onChange={props.radioChange} />
        <span className="radio big"></span>
      </label>
    </div>
  )
}

export default TirednessScale;