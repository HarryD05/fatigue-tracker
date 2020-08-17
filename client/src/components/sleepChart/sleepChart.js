//React dependencies
import React from 'react';
import { Bar } from 'react-chartjs-2';

//Helpers
import { sleepCause } from '../../helpers/enum';

const SleepChart = props => {
  const { days } = props;

  const causes = [];
  const labels = [];
  sleepCause.forEach(cause => {
    //causes.push(Math.ceil(Math.random() * 10));
    causes.push(0);
    labels.push(cause);
  });

  days.forEach(day => {
    causes[day.sleepCause] += 1;
  })

  let chartData = {
    labels,
    datasets: [{
      data: [...causes],
      backgroundColor: ['#53bbfc', '#53fc67', '#fcd453', '#f78b2c', '#f72c33', '#dc2cf7', '#762cf7']
    }]
  };

  if (days) {
    return (
      <>
        <p>Frequency of each cause of bad sleep</p>
        <Bar
          data={chartData}
          height={150}
          options={{
            responsive: true,
            scales: {
              yAxes: [{
                ticks: {
                  min: 0,
                  beginAtZero: true,
                  fontColor: 'black',
                  maxTicksLimit: 5
                }
              }],
              xAxes: [{
                ticks: {
                  fontColor: 'black'
                }
              }]
            },
            legend: {
              display: false
            }
          }}
        />
      </>
    )
  } else {
    return null;
  }
}

export default SleepChart;