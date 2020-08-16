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
      data: [
        {
          totalMent: 0,
          totalPhys: 0,
          count: 0
        },
        {
          totalMent: 0,
          totalPhys: 0,
          count: 0
        },
        {
          totalMent: 0,
          totalPhys: 0,
          count: 0
        }
      ]
    })
  })

  logs.forEach(log => {
    const length = calcDiff(log.endTime, log.startTime);
    const mentRate = (log.endMentTiredness - log.initMentTiredness) / length;
    const physRate = (log.endPhysTiredness - log.initPhysTiredness) / length;
    if (new Date(log.endTime).getHours() < 12) {
      cats[log.category].data[0].totalMent += mentRate;
      cats[log.category].data[0].totalPhys += physRate;
      cats[log.category].data[0].count += 1;
    } else if (new Date(log.endTime).getHours() < 18) {
      cats[log.category].data[1].totalMent += mentRate;
      cats[log.category].data[1].totalPhys += physRate;
      cats[log.category].data[1].count += 1;
    } else {
      cats[log.category].data[2].totalMent += mentRate;
      cats[log.category].data[2].totalPhys += physRate;
      cats[log.category].data[2].count += 1;
    }
  });

  cats.forEach(cat => {
    cat.data.forEach(time => {
      time.mentalRate = (time.totalMent / time.count);
      time.physicalRate = (time.totalPhys / time.count);
    })
  });

  return (
    <>
      <p>The mental & physical tiredness columns are the rate of change of tiredness per minute (scaled)</p>
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>Category</th>
            <th colSpan={2}>Woke up - 12:00</th>
            <th colSpan={2}>12:00 - 18:00</th>
            <th colSpan={2}>18:00 - Bed time</th>
          </tr>
          <tr>
            <th>Mental</th>
            <th>Physical</th>
            <th>Mental</th>
            <th>Physical</th>
            <th>Mental</th>
            <th>Physical</th>
          </tr>
        </thead>
        <tbody>
          {cats.map(cat => <CategoryRow key={cat.name + Math.ceil(Math.random() * 10)} data={cat} />)}
        </tbody>
      </table>
    </>
  )
}

export default CategoryImpact;