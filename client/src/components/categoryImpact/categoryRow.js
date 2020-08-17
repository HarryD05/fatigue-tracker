//React dependencies
import React from 'react';
import { round } from 'lodash';

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

  const renderName = name => {
    let output = name;
    if (name === 'Rehabilitation') output = 'Rehab';
    else if (name === 'Non-productive') output = 'Non-prod';

    return <td>{output}</td>;
  }

  const renderRate = rate => {
    if (isNaN(rate)) return <td>NO DATA</td>;
    else return <td style={chooseColour(rate)}>{round((rate * 1000))}</td>;
  }

  return (
    <tr>
      {renderName(data.name)}
      {data.data.map((val, i) => {
        return (
          <React.Fragment key={i}>
            {renderRate(val.mentalRate)}
            {renderRate(val.physicalRate)}
          </React.Fragment>
        )
      })}
    </tr>
  )
}

export default CategoryRow;