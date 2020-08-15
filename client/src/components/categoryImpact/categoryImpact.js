//React dependencies
import React from 'react';

//Helpers
import { categories } from './../../helpers/enum';

//Components
import CategoryRow from './categoryRow';

const CategoryImpact = props => {
  const { logs } = props;

  const calcDiff = (endTime, startTime) => {
    const diff = Math.abs(new Date(endTime) - new Date(startTime)) / 1000;
    const mins = Number((diff / 60).toFixed(1));

    return mins;
  }

  const cats = [];
  categories.forEach(category => {
    cats.push({
      name: category,
      totalMent: 0,
      totalPhys: 0,
      count: 0
    })
  })

  logs.forEach(log => {
    const length = calcDiff(log.endTime, log.startTime);
    const mentRate = (log.endMentTiredness - log.initMentTiredness) / length;
    const physRate = (log.endPhysTiredness - log.initPhysTiredness) / length;
    cats[log.category].totalMent += mentRate;
    cats[log.category].totalPhys += physRate;
    cats[log.category].count += 1;
  });

  cats.forEach(cat => {
    cat.mentalRate = (cat.totalMent / cat.count);
    cat.physicalRate = (cat.totalPhys / cat.count);
  });

  const mental = [...cats];
  const physical = [...cats];

  mental.sort((a, b) => {
    return a.mentalRate - b.mentalRate;
  });

  physical.sort((a, b) => {
    return a.physicalRate - b.physicalRate;
  });

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Average rate of change of mental tiredness per minute</th>
          </tr>
        </thead>
        <tbody>
          {mental.map(cat => <CategoryRow key={cat.name} data={cat} />)}
        </tbody>
      </table>
      <br />
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Average rate of change of physical tiredness per minute</th>
          </tr>
        </thead>
        <tbody>
          {physical.map(cat => <CategoryRow key={cat.name} data={cat} isPhysical />)}
        </tbody>
      </table>
    </>
  )
}

export default CategoryImpact;