//React dependencies
import React from 'react';
import { Scatter } from 'react-chartjs-2';

//Helpers
import { categories } from './../../helpers/enum';



//Options for line graphs
const options = {
  responsive: true,
  maintainAspectRatio: true,
  pointRadius: 10,
  legend: {
    display: false
  },
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Change in tiredness',
        fontColor: '#000000',
        fontSize: 14
      },
      ticks: {
        beginAtZero: true,
        suggestedMax: 6,
        stepSize: 1
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Initial tiredness',
        fontColor: '#000000',
        fontSize: 14
      },
      ticks: {
        beginAtZero: true,
        suggestedMax: 6,
      }
    }]
  }
}

const StartingTiredness = props => {
  const { logs } = props;

  //Extracting logs that have the category - rehab
  const rehabLogs = logs.filter(log => log.category === categories.indexOf('Rehabilitation'));

  //Extracting the required data, initial tiredness & change in tiredness
  const mental = [];
  const physical = [];
  rehabLogs.forEach(log => {
    mental.push({
      x: [log.initMentTiredness],
      y: [log.endMentTiredness - log.initMentTiredness]
    });

    physical.push({
      x: [log.initPhysTiredness],
      y: [log.endPhysTiredness - log.initPhysTiredness]
    });
  })

  //Setting up line chart data
  const mentalChartData = {
    datasets: [
      {
        label: 'Mental tiredness',
        backgroundColor: '#FF0000',
        borderColor: '#FF0000',
        borderWidth: 5,
        fill: true,
        data: [...mental]
      }
    ]
  };

  const physicalChartData = {
    datasets: [
      {
        label: 'Physical tiredness',
        backgroundColor: '#0000FF',
        borderColor: '#0000FF',
        borderWidth: 5,
        fill: true,
        data: [...physical]
      }
    ]
  };

  //Rendering line charts
  return (
    <>
      <h3>Mental tiredness</h3>
      <Scatter
        className="scatter-graph"
        data={mentalChartData}
        options={options}
      />

      <br />

      <h3>Physical tiredness</h3>
      <Scatter
        className="scatter-graph"
        data={physicalChartData}
        options={options}
      />
    </>
  );
}

export default StartingTiredness;