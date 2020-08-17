//React dependencies
import React from 'react';

//Components
import CategoryChart from './categoryChart';

//Styling
import './activityRehab.scss';

//Helpers
import { categories } from './../../helpers/enum';

const ActivityRehab = props => {
  const { logs } = props;

  let rehabLogs = {};
  categories.forEach(cat => {
    rehabLogs[cat] = { logs: [] };
  });

  for (let i = 0; i < logs.length; i++) {
    if (logs[i].category === categories.indexOf('Rehabilitation')) {
      rehabLogs[categories[logs[i - 1].category]].logs.push([logs[i - 1], logs[i]]);
    }
  }

  const renderCategory = cat => {
    let data = [...rehabLogs[cat].logs];
    let output;
    if (data.length === 0) {
      output = <p>NO DATA</p>;
    } else {
      output = <CategoryChart data={data} />;
    }

    return (
      <div className="category" key={cat}>
        <h3>{cat}</h3>
        {output}
      </div>
    )
  }

  const renderCategories = () => {
    let output = [];
    for (const cat in rehabLogs) {
      output.push(
        renderCategory(cat)
      );
    }
    return output;
  }

  return renderCategories();
}

export default ActivityRehab;