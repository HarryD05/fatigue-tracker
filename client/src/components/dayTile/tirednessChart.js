//React dependencies
import React from 'react';
import { Line } from 'react-chartjs-2';

const TirednessChart = props => {
  let { data } = props;

  if (data.endTime === null) {
    data.logs.pop();
  }

  //Extract tiredness values
  let mentTiredness = [data.initMentTiredness];
  let physTiredness = [data.initPhysTiredness];
  let times = [new Date(data.startTime)];

  data.logs.forEach(log => {
    mentTiredness.push(log.endMentTiredness);
    physTiredness.push(log.endPhysTiredness);
    times.push(new Date(log.endTime));
  });

  const chartData = {
    labels: [...times],
    datasets: [
      {
        label: 'Mental tiredness',
        borderColor: '#FF0000',
        borderWidth: 1,
        fill: false,
        data: [...mentTiredness]
      },
      {
        label: 'Physical tiredness',
        borderColor: '#0000FF',
        borderWidth: 1,
        fill: false,
        data: [...physTiredness]
      },
    ]
  };

  return (
    <div className="tiredness-chart">
      <h3>Tiredness over time</h3>

      <Line
        data={chartData}
        options={{
          maintainAspectRatio: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              type: 'time',
              time: {
                unit: 'hour'
              },
              ticks: {
                beginAtZero: false
              }
            }]
          }
        }}
      />
    </div>
  )
}

export default TirednessChart;