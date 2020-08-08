//React dependencies
import React from 'react';

import { categories } from './../../helpers/enum';

const CatTimings = props => {
  let categoryHTML = '';

  let count = -1;
  props.timeSpent.forEach(time => {
    count++;
    categoryHTML += `
      <div className="category">
        <b>${categories[count]}</b>: <p>${time.toFixed(2)} mins</p>
      </div>
    `
  })

  return (
    <div className="categories" dangerouslySetInnerHTML={{ __html: categoryHTML }} ></ div>
  )
}

export default CatTimings;