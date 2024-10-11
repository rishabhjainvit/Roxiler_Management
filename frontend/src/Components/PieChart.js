import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };


  const styles = {
    chartContainer: {
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      backgroundColor: '#fff',
      transition: 'transform 0.3s ease',
    },
    title: {
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    pieChart: {
      position: 'relative',
      width: '100%',
      height: '400px', 
      transition: 'transform 0.3s ease',
    },
    hoverEffect: {
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
  };

  return (
    <div style={{ ...styles.chartContainer, ...styles.hoverEffect }}>
      <h2 style={styles.title}>Pie Chart</h2>
      <div style={styles.pieChart}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default PieChart;
