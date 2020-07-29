//React dependencies
import React from 'react';

const categories = {
  0: 'Required',
  1: 'Rest',
  2: 'Rehabilitation',
  3: 'Socialising',
  4: 'Non-productive'
}

const CatTimings = props => {
  let categoryHTML = '';

  let count = -1;
  props.timeSpent.map(time => {
    count++;
    categoryHTML += `
      <div className="category">
        <b>${categories[count]}</b>: <p>${time} mins</p>
      </div>
    `
  })

  return (
    <div className="categories" dangerouslySetInnerHTML={{ __html: categoryHTML }} ></ div>
  )
}

export default CatTimings;