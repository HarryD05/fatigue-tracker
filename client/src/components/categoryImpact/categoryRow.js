//React dependencies
import React from 'react';

const CategoryRow = props => {
  const { data } = props;

  const chooseColour = num => {
    if (num === 0) {
      return { color: 'blue' }
    } else if (num > 0) {
      return { color: 'red' }
    } else {
      return { color: 'green' };
    }
  }

  const renderPhysical = () => <td style={chooseColour(data.physicalRate)}>{(data.physicalRate).toFixed(3)}</td>;
  const renderMental = () => <td style={chooseColour(data.mentalRate)}>{(data.mentalRate).toFixed(3)}</td>;

  return (
    <tr>
      <td>{data.name}</td>
      {props.isPhysical === true ? renderPhysical() : renderMental()}
    </tr>
  )
}

export default CategoryRow;