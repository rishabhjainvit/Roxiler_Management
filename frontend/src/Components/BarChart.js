import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [barChartData, setBarChartData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(3);

 
  const predefinedData = {
    1: { '0-50': 10, '51-100': 25, '101-200': 30, '201-500': 20, '501-1000': 15, '1001-above': 10 },
    2: { '0-50': 12, '51-100': 22, '101-200': 27, '201-500': 18, '501-1000': 13, '1001-above': 8 },
    3: { '0-50': 15, '51-100': 30, '101-200': 35, '201-500': 25, '501-1000': 20, '1001-above': 12 },
    4: { '0-50': 10, '51-100': 20, '101-200': 25, '201-500': 22, '501-1000': 18, '1001-above': 15 },
    5: { '0-50': 8, '51-100': 18, '101-200': 22, '201-500': 24, '501-1000': 16, '1001-above': 10 },
    6: { '0-50': 13, '51-100': 28, '101-200': 32, '201-500': 21, '501-1000': 17, '1001-above': 9 },
    7: { '0-50': 11, '51-100': 26, '101-200': 28, '201-500': 19, '501-1000': 14, '1001-above': 7 },
    8: { '0-50': 9, '51-100': 19, '101-200': 24, '201-500': 23, '501-1000': 15, '1001-above': 11 },
    9: { '0-50': 14, '51-100': 27, '101-200': 31, '201-500': 22, '501-1000': 19, '1001-above': 12 },
    10: { '0-50': 10, '51-100': 20, '101-200': 26, '201-500': 20, '501-1000': 15, '1001-above': 8 },
    11: { '0-50': 12, '51-100': 24, '101-200': 30, '201-500': 22, '501-1000': 17, '1001-above': 10 },
    12: { '0-50': 13, '51-100': 25, '101-200': 32, '201-500': 24, '501-1000': 18, '1001-above': 11 },
  };

  
  const fetchDataFromAPI = async (month) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/bar-chart/03=${month}`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching data from API:', error);
      return predefinedData[month]; 
    }
  };

 
  const fetchBarChartData = async (month = 3) => {
    const data = await fetchDataFromAPI(month);
    setBarChartData(data);
  };

  useEffect(() => {
    fetchBarChartData(selectedMonth);
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value, 10);
    if (month >= 1 && month <= 12) {
      setSelectedMonth(month);
    }
  };

  const handleSubmit = () => {
    fetchBarChartData(selectedMonth);
  };

  const chartData = {
    labels: Object.keys(barChartData), 
    datasets: [
      {
        label: 'Price Distribution',
        data: Object.values(barChartData), 
        backgroundColor: 'rgba(54, 162, 235, 0.6)', 
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        borderRadius: 8, 
        barThickness: 20, 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 18,
            family: 'Poppins, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        borderRadius: 5,
        titleFont: {
          size: 14,
          family: 'Arial, sans-serif',
        },
        bodyFont: {
          size: 12,
          family: 'Arial, sans-serif',
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: '#ddd',
          lineWidth: 1,
        },
        title: {
          display: true,
          text: 'Price Ranges',
          color: '#333',
          font: {
            size: 18,
            family: 'Poppins, sans-serif',
          },
        },
        barPercentage: 1,
        categoryPercentage: 1,
      },
      y: {
        grid: {
          color: '#ddd',
          lineWidth: 1,
        },
        title: {
          display: true,
          text: 'Counts',
          color: '#333',
          font: {
            size: 18,
            family: 'Poppins, sans-serif',
          },
        },
        beginAtZero: true,
      },
    },
  };

  const styles = {
    chartContainer: {
      maxWidth: '80%', 
      margin: '30px auto', 
      padding: '30px',
      border: '2px solid #ddd',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      overflow: 'hidden', 
    },
    title: {
      textAlign: 'center',
      fontFamily: 'Poppins, sans-serif',
      color: '#333',
      marginBottom: '30px',
      fontSize: '24px',
    },
    chart: {
      position: 'relative',
      width: '100%',
      height: '450px',
    },
    form: {
      textAlign: 'center',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'center', 
      gap: '20px',
      flexDirection: 'column',
    },
    select: {
      padding: '12px',
      fontSize: '18px',
      marginRight: '20px',
      borderRadius: '8px',
      border: '2px solid #ddd',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    selectFocus: {
      borderColor: '#4CAF50',
    },
    button: {
      padding: '12px 25px',
      fontSize: '18px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    buttonHover: {
      backgroundColor: '#45a049',
      transform: 'scale(1.05)',
    },
  };

  return (
    <div style={styles.chartContainer}>
      <h2 style={styles.title}>Monthly Candle Distribution</h2>
      <div style={styles.form}>
        <select
          style={styles.select}
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {[...Array(12).keys()].map((month) => (
            <option key={month + 1} value={month + 1}>
              {new Date(0, month).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <button
          style={styles.button}
          onClick={handleSubmit}
        >
          Update Chart
        </button>
      </div>
      <div style={styles.chart}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default BarChart;
