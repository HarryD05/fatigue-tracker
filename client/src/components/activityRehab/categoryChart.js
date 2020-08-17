//React dependencies
import React from 'react';
import { Scatter } from 'react-chartjs-2';

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
        labelString: 'Change in tiredness (during rehabilitation activity)',
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
        labelString: 'Duration (minutes)',
        fontColor: '#000000',
        fontSize: 14
      },
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

const CategoryChart = props => {
  const { data } = props;

  const mentalResult = [];
  const physicalResult = [];
  data.forEach(val => {
    const diff = Math.abs(new Date(val[1].endTime) - new Date(val[1].startTime)) / 1000;
    const mins = Number((diff / 60).toFixed(1));

    mentalResult.push({
      x: [mins],
      y: [val[1].endMentTiredness - val[1].initMentTiredness]
    })

    physicalResult.push({
      x: [mins],
      y: [val[1].endPhysTiredness - val[1].initPhysTiredness]
    })
  })

  const mentalData = {
    datasets: [
      {
        backgroundColor: '#FF0000',
        borderColor: '#FF0000',
        borderWidth: 5,
        fill: true,
        data: [...mentalResult]
      }
    ]
  };
  const physicalData = {
    datasets: [
      {
        backgroundColor: '#0000FF',
        borderColor: '#0000FF',
        borderWidth: 5,
        fill: true,
        data: [...physicalResult]
      }
    ]
  };

  return (
    <>
      <p>Mental tiredness</p>
      <Scatter
        className="scatter-graph"
        data={mentalData}
        options={options}
      />

      <br />

      <p>Physical tiredness</p>
      <Scatter
        className="scatter-graph"
        data={physicalData}
        options={options}
      />
    </>
  )
}

export default CategoryChart;