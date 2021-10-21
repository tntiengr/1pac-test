import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data = {} }) => {
  return (
    <>
      <Bar
        data={{
          labels: ['Confirmed', 'Deaths', 'Recovered'],
          datasets: [{
            label: 'Covid Situation',
            data: [data?.Confirmed, data?.Deaths, data?.Recovered],
            backgroundColor: [
              'rgba(255, 206, 86, 0.4)',
              'rgba(173, 17, 28, 0.2)',
              'rgba(34, 92, 240, 0.4)',
            ],
            borderColor: [
              'rgba(255, 206, 86, 1)',
              'rgba(173, 17, 28, 1)',
              'rgba(34, 92, 240, 4)',
            ],
            borderWidth: 1
          }]
        }}
        width={400}
        height={200}
        options={
          {
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        }
      />
    </>
  );
};


BarChart.propTypes = {
  data: PropTypes.object,
};


export default BarChart;
